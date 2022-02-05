<template>
  <div :class="['file-input', { 'file-input_disabled': disabled }]">
    <label class="file-input__wrapper">
      <div class="file-input__fake" v-if="isInitial">
        <div class="file-input__icon"></div>
        <span class="file-input__text ml-4">{{ initialText }}</span>
      </div>
      <div class="file-input__fake" v-else-if="isSaving">
        <div class="file-input__icon file-input__icon_loading"></div>
        <span class="file-input__title">Загрузка {{ getState(fileCount, savingText) }}</span>
      </div>
      <div class="file-input__fake" v-else-if="isSuccess">
        <div class="file-input__icon file-input__icon_uploaded"></div>
        <span class="file-input__title">{{ getState(fileCount, successText) }}</span>
      </div>
      <div class="file-input__fake" v-else-if="isFailed">
        <div class="file-input__icon file-input__icon_error"></div>
        <span class="file-input__title">Ошибка, </span>
        <span class="file-input__text">попробуйте еще раз</span>
      </div>
      <div class="file-input__fake" v-else-if="isSelected">
        <div class="file-input__icon"></div>
        <span class="file-input__title">{{ getState(fileCount, selectedText) }}</span>
      </div>
      <input
        type="file"
        class="file-input__input"
        :accept="accept"
        :disabled="disabled"
        :name="name"
        :multiple="multiple"
        @change="onFileChange($event.target.name, $event.target.files)"
      />
    </label>
  </div>
</template>

<docs>
  Вид с автоматической загрузкой файлов при выборе:
  ```[import](./example/upload.vue)
  ```

  Обычное поле, после выбора просто отображает кол-во выбранных файлов и прокидывает их через v-model:
  ```[import](./example/field.vue)
  ```

  Задизейбленный:
  ```
  <FileInput disabled/>
  ```
</docs>

<script>
import declOfNum from '@src/helper/declOfNum.js'

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3
const STATUS_SELECTED = 4

export default {
  name: 'FileInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Кнопка задизейблена
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Атрибут name для инпута
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Текст, при начальном состоянии инпута
     */
    initialText: {
      type: String,
      default: 'Выберите файл для загрузки'
    },
    /**
     * Текст, при состоянии загрузки инпута.
     * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
     * За преобразование в правильный падеж отвечает функция declOfNum
     */
    savingText: {
      type: Array,
      default() {
        return ['файла', 'файлов', 'файлов']
      }
    },
    /**
     * Текст, при успешном состоянии инпута.
     * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
     * За преобразование в правильный падеж отвечает функция declOfNum
     */
    successText: {
      type: Array,
      default() {
        return ['Файл загружен, перезагрузить', 'файла загружено, перезагрузить', 'файлов загружено, перезагрузить']
      }
    },
    /**
     * Текст, после выбора файлов.
     * Добавляем через массив, чтобы был правильный падеж у слова, в зависимости от количества загруженных файлов.
     * За преобразование в правильный падеж отвечает функция declOfNum
     */
    selectedText: {
      type: Array,
      default() {
        return ['Файл выбран', 'файла выбрано', 'файлов выбрано']
      }
    },
    /**
     * Возможен ли выбор нескольких файлов
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Вызывается при загрузке, в качестве параметров передается formData, внутри функции нужно куда-нибудь отправить файлы и вернуть промис
     */
    uploadTo: Function,
    /**
     * Начальное состояние инпута
     * @values initial, saving, success, failed, selected
     */
    status: {
      type: String,
      default: 'initial',
      validator(value) {
        return ['initial', 'saving', 'success', 'failed', 'selected'].some((el) => el === value)
      }
    },
    /**
     * MIME-форматы, которые можно выбрать в инпуте
     */
    accept: {
      type: String,
      default: 'image/*'
    },
    value: null
  },
  data() {
    return {
      uploadError: 'Файл не загрузился, попробуйте еще раз',
      currentStatus: this.getInitialStatus(),
      fileCount: this.value?.length
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },
    isSelected() {
      return this.currentStatus === STATUS_SELECTED
    }
  },
  watch: {
    status() {
      this.currentStatus = this.getInitialStatus()
    }
  },
  methods: {
    async save(formData, fileList) {
      this.currentStatus = STATUS_SAVING
      try {
        const response = await this.uploadTo({ formData, fileList, name: this.name })
        /**
         * Вызывается после успешной загрузки файла
         * @property {object} response данные, пришедшие в ответ после успешной загрузки
         */
        this.$emit('afterUpload', response)
        this.currentStatus = STATUS_SUCCESS
      } catch (e) {
        this.uploadError = e?.response?.error || this.uploadError
        this.currentStatus = STATUS_FAILED
      }
    },
    onFileChange(fieldName, fileList) {
      if (!fileList.length) return

      if (this.uploadTo) {
        const formData = new FormData()
        Array.from(Array(fileList.length).keys()).map((x) => {
          formData.append(fieldName, fileList[x], fileList[x].name)
        })
        this.save(formData, fileList)
      } else {
        /**
         * Вызывается после выбора файлов
         * @property {array} fileList список выбранных файлов напрямую из инпута
         */
        this.$emit('change', fileList)
        this.currentStatus = STATUS_SELECTED
      }
      this.fileCount = fileList.length
    },
    getState(count, arr) {
      return +count === 1 ? arr[0] : `${count} ${declOfNum(count, arr)}`
    },
    getInitialStatus() {
      switch (this.status) {
        case 'initial':
          return STATUS_INITIAL
        case 'saving':
          return STATUS_SAVING
        case 'success':
          return STATUS_SUCCESS
        case 'failed':
          return STATUS_FAILED
        case 'selected':
          return STATUS_SELECTED
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.file-input {
  display: inline-block;
  padding: 10px 14px 9px 12px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  text-align: center;
  position: relative;
  &:hover {
    background-color: #fffae5;
    border: 1px solid rgba(0, 0, 0, 0.13);
    transition: background-color 0.2s ease-out, border 0.2s ease-out;
  }
  &:active {
    border: 1px solid transparent;
    background-color: #e3dfcd;
  }
  &__icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url('~@img/icon/load.svg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 16px;
    vertical-align: top;
    &_loading {
      background-image: url('~@img/icon/loading-oval.svg');
      background-size: 18px;
    }
    &_uploaded {
      background-image: svg-load('./icon/tick.svg', fill=#11C86F);
      background-size: auto 13px;
    }
    &_error {
      background-image: svg-load('./icon/donotenter.svg', fill=#EB0010);
      background-size: auto 16px;
    }
  }
  &__input {
    opacity: 0;
    width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    cursor: pointer;
  }
  &__title {
    margin-left: 5px;
    font-weight: 500;
  }
  &__fake {
    display: inline-block;
  }
  &_disabled {
    color: #818181;
    border: 1px solid rgba(0, 0, 0, 0.13);
    cursor: not-allowed;
    background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 0, #fff 13px);
    &:active {
      border: 1px solid rgba(0, 0, 0, 0.13);
    }
    ^&__icon {
      background-image: svg-load('./icon/load.svg', fill=#818181);
    }
  }
}
</style>
