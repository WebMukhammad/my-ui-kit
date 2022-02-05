<template>
  <div class="input-button" :class="[{ 'input-button_error': error, 'input-button_disabled': disabled }]">
    <div class="input-button__input-wrapper">
      <input
        :name="name"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :type="type"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        :placeholder="placeholder"
        :value="value"
        class="input-button__input"
      />
    </div>
    <div class="input-button__button" :class="getButtonState" @click="onClick">
      {{ buttonText }}
    </div>
  </div>
</template>

<docs>
  Базовый вид
  ```
  <InputButton placeholder="Введите телефон"/>
  ```

  Вид с ошибкой
  ```
  <InputButton error placeholder="Введите телефон"/>
  ```

  Задизейблено
  ```
  <InputButton disabled placeholder="Введите телефон"/>
  ```

  Интерактивная форма
  ```[import](./example/form.vue)
  ```
</docs>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * Value для инпута
     */
    value: {
      type: String
    },
    /**
     * Атрибут name для инпута
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Атрибут передается напрямую в инпут
     */
    autocomplete: {
      type: String,
      default: null
    },
    /**
     * Тип поля ввода
     * @values text, password
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * Текущее состояние инпута-формы, переключается состояние только через прос
     * @values loading, success, default
     */
    state: {
      type: String,
      default: null,
      validator: (val) => {
        return ['loading', 'success', 'default'].some((el) => el === val)
      }
    },
    /**
     * Для инпута
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Текст на кнопке
     */
    buttonText: {
      type: String,
      default: 'Отправить'
    },
    /**
     * Задизейблено ли поле
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Вид поля с ошибкой
     */
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    getButtonState() {
      if (this.state === 'success') {
        return 'input-button__button_success'
      } else if (this.state === 'loading') {
        return 'input-button__button_loading'
      } else {
        return 'input-button__button_default'
      }
    }
  },
  methods: {
    onClick() {
      /**
       * Срабатывает при клике на кнопку
       * @property {string} value из инпута
       */
      this.$emit('click', this.value)
    },
    onInput(e) {
      /**
       * Срабатывает при вводе значения в поле
       * @property {string} value из инпута
       */
      this.$emit('input', e.target.value)
    },
    onFocus(e) {
      this.$emit('focus', e.target.value)
    },
    onBlur(e) {
      this.$emit('blur', e.target.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
.input-button {
  height: 39px;
  display: flex;
  &_error {
    ^&__input {
      border-color: #f03d3d;
      &::placeholder {
        color: #c69898;
      }
    }
  }
  &_disabled {
    cursor: not-allowed;
    background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 0, #fff 13px);
    ^&__input {
      border-color: rgba(0, 0, 0, 0.13);
      background-color: transparent;
    }
    ^&__button {
      color: #818181;
      border-color: rgba(0, 0, 0, 0.13);
      background-color: transparent;
      &:hover {
        color: #818181;
      }
    }
  }
  &__input-wrapper {
    color: #000;
    flex-grow: 1;
  }
  &__input {
    width: 100%;
    height: 39px;
    border: none;
    padding: 5px 14px;
    font-size: 14px;
    line-height: 16px;
    border: 1px solid #e5e5e5;
    border-radius: 4px 0 0 4px;
    outline: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    &:focus {
      border-color: #0e49fb;
      &::placeholder {
        color: #6574a1;
      }
    }
    &::placeholder {
      color: #757575;
    }
  }
  &__button {
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    line-height: 19px;
    font-weight: 500;
    border: 1px solid #e5e5e5;
    border-left: 0;
    border-radius: 0 4px 4px 0;
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    cursor: pointer;
    &_default {
      &:hover {
        color: #e30613;
      }
    }
    &_loading {
      color: transparent;
      background-image: url('~@img/icon/loading-oval.svg');
      background-size: 18px;
    }
    &_success {
      color: transparent;
      background-image: svg-load('./icon/tick.svg', fill=#11C86F);
      background-size: auto 13px;
    }
  }
}
</style>
