<template>
  <label :class="['tiny-input', { 'tiny-input_error': this.error }]">
    <input
      :type="type"
      class="tiny-input__input"
      :value="isModelValueActive ? modelValue : val"
      :name="name"
      :style="[{ width: inputWidth + 'px' }, maxWidth ? { 'max-width': maxWidth + 'px' } : null]"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="tiny-input__postfix-text" v-if="postfix">{{ postfix }}</span>
  </label>
</template>

<docs>
  Поля ввода через v-model:
  ```[import](./example/example.vue)
  ```

  Поля ввода которое работает через внутреннее состояние и стандартный value:
  ```[import](./example/internalState.vue)
  ```

  Задизейбленный вид поля ввода:
  ```
  <TinyInput disabled/>
  ```
</docs>

<script>
/**
 * Компонент поля ввода, который изменяет ширину в зависимости от количество введенных символов.
 */
export default {
  name: 'TinyInput',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  data() {
    return {
      val: this.value,
      isModelValueActive: false
    }
  },
  props: {
    /**
     * Прокидывается в атрибут name инпута
     */
    name: {
      type: String,
      default: null
    },
    /**
     * Значение поля ввода
     */
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    /**
     * Значение поля ввода
     */ value: {
      type: [String, Number],
      default: null
    },
    /**
     * Placeholder для поля ввода
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Состояние ошибки
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Задизейблено
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Тип поля
     * @values password, text, number
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * Текст после инпута
     */
    postfix: {
      type: String,
      default: null
    },
    /**
     * Максимальная ширина для поля ввода
     */
    maxWidth: {
      type: Number,
      default: null
    }
  },
  /**
   * Если передан v-model, то работаем и обновляем значение инпута через него,
   * при этом this.val тоже обновляем т.к. он нужен для расчтеа ширины инпута
   */
  created() {
    if (this.modelValue !== undefined) {
      this.isModelValueActive = true
      this.val = this.modelValue
    }
  },
  methods: {
    onInput(e) {
      /**
       * Срабатывает при вводе нового значения
       * @property { value } - значение внутри инпута
       */
      this.val = e.target.value
      this.$emit('input', e.target.value)
    },
    onFocus(e) {
      /**
       * Срабатывает при вводе нового значения
       * @property { value } - значение внутри инпута
       */
      this.$emit('focus', e.target.value)
    },
    onBlur(e) {
      /**
       * Срабатывает при расфокуске поля
       * @property { event } - стандартный объект Event из обычного обработчика
       */
      this.$emit('blur', e.target.value)
    }
  },
  computed: {
    inputWidth() {
      return this.val ? this.val.toString().length * 7 + 11 : 35
    }
  }
}
</script>

<style lang="postcss">
/* Поле ввода */
.tiny-input {
  display: inline-flex;
  max-width: 100%;
  &__input {
    font-family: 'Ubuntu Mono', monospace;
    min-width: 35px;
    max-width: 100%;
    height: 18px;
    border: none;
    padding: 2px 4px;
    font-size: 14px;
    line-height: 16px;
    background-color: #fff;
    color: #000;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    &::placeholder {
      color: #757575;
    }
    &:focus {
      border: 1px solid #0e49fb;
    }
    &:disabled {
      border: 1px solid rgba(0, 0, 0, 0.13);
      cursor: not-allowed;
      background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 0, #fff 13px);
    }
  }
  &_error {
    ^&__input {
      border: 1px solid #f03d3d;
      &::placeholder {
        color: #c69898;
      }
      &:focus {
        border: 1px solid #f03d3d;
        &::placeholder {
          color: #c69898;
        }
      }
    }
  }
  &__postfix-text {
    flex-shrink: 0;
    font-size: 14px;
    line-height: 18px;
    margin-left: 5px;
  }
}
</style>
