<template>
  <div :class="['range-input', { [`range-input_${inputType}`]: inputType, 'range-input_disabled': disabled }]">
    <label class="range-input__note">
      <span class="range-input__note-span"></span>
      <div class="range-input__note-text range-input__note-text_left" v-if="prefix">{{ prefix }}</div>
      <div class="range-input__note-wrapper">
        <input
          type="text"
          class="range-input__note-input"
          :min="min"
          :max="max"
          :placeholder="placeholder"
          :value="val"
          :disabled="disabled"
          @input="onTextInput"
          :style="{ width: valueWidth }"
          @blur="onBlur($event)"
        />
      </div>
      <div class="range-input__note-text range-input__note-text_right" v-if="postfix">{{ postfix }}</div>
      <div class="range-input__icon" :class="getIconClass()" v-if="icon" />
    </label>
    <RangeSlider
      theme="red"
      connect="lower"
      :step="1"
      :handles="+val"
      @change="onRangeSliderChange"
      :options="{ start: val }"
      :range="{ min: min, max: max }"
      :disabled="disabled"
    />
  </div>
</template>

<docs>
  Стандартный вид поля:
  ```[import](./example/simple.vue)
  ```

  Поле с префиксом для инпута:
  ```[import](./example/prefix.vue)
  ```

  Поле с постфиксом для инпута:
  ```[import](./example/postfix.vue)
  ```

  Поле с префиксом и с постфиксом для инпута:
  ```[import](./example/prefixPostfix.vue)
  ```

  Задизейбленный:
  ```
  <RangeInput disabled />
  ```

  Тач-френдли:
  ```
  <RangeInput type="touch"/>
  ```

  Задизейбленный:
  ```
  <RangeInput type="touch" disabled />
  ```

  Малый тач-ползунок:
  ```
  <RangeInput type="small-touch"/>
  ```

  Задизейбленный:
  ```
  <RangeInput type="small-touch" disabled />
  ```
</docs>

<script>
import RangeSlider from '@src/components/RangeSlider/index.vue'
import isTouchDevice from 'is-touch-device'

export default {
  name: 'RangeInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    RangeSlider
  },
  props: {
    /**
     * Подпись, подставляется перед значением
     */
    prefix: String,
    /**
     * Подпись, подставляется после значения
     */
    postfix: String,
    /**
     * Тип слайдера
     * @values small-touch, touch
     */
    type: {
      type: String,
      default: null
    },
    /**
     * Начальное значение инпута и слайдера
     * @values disabled
     */
    value: {
      type: Number,
      default: 0
    },
    /**
     * Placeholder для поля ввода
     */
    placeholder: {
      type: String,
      default: '' // нельзя ставить null т.к. в valueWidth мы пытаемся получить ширину строки
    },
    /**
     * Задизейблен
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Минимально допустимое значение
     */
    min: {
      type: Number,
      default: 0
    },
    /**
     * Максимально допустимое
     */
    max: {
      type: Number,
      default: 100
    },
    /**
     * Иконка
     * @values add, close, book, arrow-right
     */
    icon: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (!this.inputType) {
      this.inputType = isTouchDevice() ? 'small-touch' : null
    }
  },
  data() {
    return {
      inputType: this.type,
      val: +this.value
    }
  },
  computed: {
    valueWidth() {
      // чтобы placeholder не обрезался, если нет значения
      const string = this[Number.isInteger(this.val) ? 'val' : 'placeholder'].toString()
      const signCount = string ? string.split('').length : 1
      return `${signCount * 8 + 2}px` // 2px это доп. ширина для курсора, в случае когда пользователь зафокусил поле
    },
    calcValue() {
      // Значение не выходящее за диапозон min и max
      if (+this.val > this.max) {
        return this.max
      } else if (+this.val < this.min) {
        return this.min
      } else {
        return +this.val
      }
    }
  },
  watch: {
    value() {
      this.val = +this.value
    }
  },
  methods: {
    getIconClass() {
      return `icon-${this.icon} icon-${this.icon}_black`
    },
    onTextInput({ target }) {
      /**
       * Обрезаем пустые строки и запрещаем ввод любых символов кроме цифр или пустой строки
       */
      target.value = target.value.trim()
      let value = target.value ? +target.value : target.value

      value = Number.isInteger(value) || value.length === 0 ? value : this.val
      target.value = value
      this.val = value

      this.$emit('input', this.calcValue)
    },
    onRangeSliderChange(val) {
      /**
       * Срабатывает при изменении значения
       * @property { value } текущее значение
       */
      this.val = +val[0]
      this.$emit('change', +this.val)
    },
    onBlur(e) {
      /**
       * Срабатывает при расфокуске поля ввода
       * @property { event} стандартный Event
       */
      this.val = this.calcValue
      this.$emit('change', this.val)
    }
  }
}
</script>

<style lang="postcss">
.range-input {
  position: relative;
  min-height: 40px;
  &_disabled {
    color: #818181;
    cursor: not-allowed;
    ^&__note {
      border: 1px solid rgba(0, 0, 0, 0.13);
      background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 6px, #fff 13px);
      &-input {
        color: #757575;
        background-color: transparent;
      }
      ^&__input {
        background: transparent;
      }
    }
    ^&-scrollbar-track {
      background: #cbcbcb;
    }
    ^&__slider-handle,
    ^&__slider-scrollbar-track {
      background: #cbcbcb;
    }
  }
  &_touch {
    ^&__wrapper {
      bottom: 9px;
      left: 10px;
      right: 10px;
    }
    ^&__note {
      height: 55px;
      align-items: flex-start;
      padding-top: 11px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  &_touch-small &__wrapper {
    bottom: 50%;
    transform: translateY(50%);
    left: 107px;
    right: 10px;
  }
  &_touch,
  &_touch-small {
    ^&__slider-scrollbar-track {
      height: 5px;
      border-radius: 3px 0 0 3px;
    }
    ^&__slider-scrollbar {
      height: 5px;
      background: #f4f4f4;
    }
    ^&__slider-handle {
      width: 17px;
      height: 17px;
      border: 1px solid #dddddd;
      background: #fff;
    }
  }
  &__wrapper {
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
  }
  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0;
  }
  &__icon {
    margin-left: 5px;
  }
  &__note {
    display: flex;
    align-items: center;
    width: 100%;
    height: 39px;
    padding: 8px 14px;
    font-size: 14px;
    line-height: 19px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
    border-radius: 4px 4px 0px 0px;
    box-sizing: border-box;
    background-color: #fff;
    cursor: text;
    &-span {
      color: #000;
    }
    &-input {
      display: block;
      min-width: 8px;
      max-width: 100%;
      height: 16px;
      padding: 0;
      font-family: 'Ubuntu Mono', monospace;
      font-size: 16px;
      line-height: 16px;
      outline: none;
      border: 0;
      -webkit-appearance: none;
      box-sizing: border-box;
      color: #000;
      -moz-appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    &-text {
      font-size: 14px;
      line-height: 16px;
      &_left {
        margin-right: 4px;
      }
      &_right {
        margin-left: 2px;
      }
    }
  }
  &__slider {
    position: relative;
    display: block;
    cursor: pointer;
    height: 9px;
    width: 100%;
    &-scrollbar-track,
    &-handle {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      z-index: 2;
      background: #f30c00;
    }
    &-scrollbar-track {
      width: 50%;
      left: 0;
      right: 0;
    }
    &-scrollbar {
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      background: #e4e4e4;
      border-radius: 10px;
      width: 100%;
    }
    &-handle {
      left: 50%;
      width: 9px;
      height: 9px;
      display: inline-block;
      cursor: pointer;
      border-radius: 50%;
      box-sizing: border-box;
      -webkit-transition: width 0.1s ease-in-out, height 0.1s ease-in-out, top 0.1s ease-in-out;
      transition: width 0.1s ease-in-out, height 0.1s ease-in-out, top 0.1s ease-in-out;
    }
  }
}
</style>
