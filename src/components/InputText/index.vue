<template>
  <label
    :class="[
      'text-input',
      {
        'text-input_error': error,
        'text-input_success': success,
        'text-input_focus': isFocus,
        'text-input_disabled': disabled
      }
    ]"
    :style="{ borderColor: borderColor, borderRadius: borderRadius }"
  >
    <div v-if="inputIconLeft" :class="[`icon-${inputIconLeft}`, 'text-input__icon', 'text-input__icon_left']"></div>
    <div class="text-input__note-text text-input__note-text_left" v-if="prefix">{{ prefix }}</div>
    <input
      :type="inputType"
      :autocomplete="autocomplete"
      class="text-input__input"
      ref="input"
      :value="isModelValueActive ? modelValue : val"
      :name="name"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur($event)"
    />
    <div class="text-input__note-text text-input__note-text_right" v-if="postfix">{{ postfix }}</div>
    <div
      v-if="type === 'password'"
      class="text-input__icon text-input__icon_password"
      :class="inputType === 'password' ? 'icon-eye icon-eye_grey' : 'icon-eye-closed icon-eye-closed_grey'"
      @click="toggleInputType"
    ></div>
    <div v-else-if="inputIconRight" :class="[`icon-${inputIconRight}`, 'text-input__icon', 'text-input__icon_right']"></div>
  </label>
</template>

<docs>
  Поля ввода и его value:
  ```[import](./example/example.vue)
  ```

  Изменение value через внутреннее состояние с передачей дефолтного:
  ```[import](./example/internalState.vue)
  ```

  Поле ввода с иконкой слева:
  ```
  <InputText placeholder="Введите город" iconLeft="add-grey"/>
  ```

  Поле ввода с иконкой справа и типом password:
  ```
  <InputText placeholder="Введите город" type="password" />
  ```

  Поле ввода с иконкой слева и справа:
  ```
  <InputText placeholder="Введите город" iconLeft="add-grey" iconRight="close"/>
  ```

  Задизейбленный вид поля ввода:
  ```
  <InputText placeholder="Введите город" disabled/>
  ```
</docs>

<script>
export default {
  name: 'InputText',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    /**
     * Атрибут прокидывается напрямую в input
     * @values text, password
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * Атрибут передается напрямую в инпут
     */
    autocomplete: {
      type: String,
      default: null
    },
    /**
     * Кастомный border-color у инпута
     */
    borderColor: {
      type: String,
      default: null
    },
    /**
     * Атрибут name для инпута
     */
    name: {
      type: String,
      default: null
    },
    modelValue: {
      type: [String, Number],
      default: undefined
    },
    /**
     * свойство border-radius у инпута
     */
    borderRadius: {
      type: String,
      default: null
    },
    /**
     * Значение поля ввода
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Placeholder для поля ввода
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Иконка слева для поля ввода
     * @values add, clone, book, card
     */
    iconLeft: {
      type: String,
      default: null
    },
    /**
     * Иконка справа для поля ввода
     * @values add, clone, book, card
     */
    iconRight: {
      type: String,
      default: null
    },
    /**
     * Иконка для поля ввода
     * @values add, clone, book, card
     * @deprecated для добавления иконки, нужно использовать пропс iconLeft или iconRight
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * С какого края отображать иконку в поле ввода
     * @values left, right
     * @deprecated для позиционирования иконки, нужно использовать пропс iconLeft или iconRight
     */
    iconPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].some((el) => el === value)
      }
    },
    /**
     * Состояние ошибки
     * @values true, false
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Успешное состояние
     * @values true, false
     */
    success: {
      type: Boolean,
      default: false
    },
    /**
     * Задизейблено
     * @values true
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Без border'a
     */
    withoutBorders: {
      type: Boolean,
      default: false
    },
    /**
     * Подпись, подставляется перед значением
     */
    prefix: {
      type: String,
      default: null
    },
    /**
     * Подпись, подставляется после значения
     */
    postfix: {
      type: String,
      default: null
    },
    /**
     * Запретить ли изменение поля самим пользователем
     * @values true
     */
    readonly: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.isModelValueActive = this.modelValue !== undefined
  },
  data() {
    return {
      val: this.value,
      inputType: this.type,
      isFocus: false
    }
  },
  computed: {
    inputIconLeft() {
      if (this.icon && this.iconPosition === 'left') {
        return this.icon
      } else if (this.iconLeft) {
        return this.iconLeft
      } else {
        return null
      }
    },
    inputIconRight() {
      if (this.icon && this.iconPosition === 'right') {
        return this.icon
      } else if (this.iconRight) {
        return this.iconRight
      } else {
        return null
      }
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
       * Срабатывает при фокусе поля
       * @property { event } - стандартный объект Event из обычного обработчика
       */
      this.isFocus = true
      this.$emit('focus', e.target.value)
    },
    onBlur(e) {
      /**
       * Срабатывает при расфокуске поля
       * @property { event } - стандартный объект Event из обычного обработчика
       */
      this.isFocus = false
      this.$emit('blur', e.target.value)
    },
    toggleInputType() {
      if (!this.disabled) {
        this.inputType = this.inputType === 'password' ? 'text' : 'password'
        this.$refs.input.focus()
      }
    }
  }
}
</script>

<style lang="postcss">
/* Поле ввода */
.text-input {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border: 1px solid #e5e5e5;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  cursor: text;
  &_focus {
    border: 1px solid #0e49fb;
  }
  &_error {
    border: 1px solid #f03d3d;
    ^&__input::placeholder {
      color: #c69898;
    }
  }
  &_success {
    border: 1px solid #11c86f;
  }
  &_disabled {
    border: 1px solid rgba(0, 0, 0, 0.13);
    cursor: not-allowed;
    background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 0, #fff 13px);
  }
  &__input {
    width: 100%;
    height: 37px;
    border: none;
    padding: 5px 0;
    font-size: 14px;
    line-height: 16px;
    background-color: transparent;
    color: #000;
    outline: none;
    -webkit-appearance: none;
    box-sizing: border-box;
    &::placeholder {
      color: #757575;
    }
    &:-webkit-autofill {
      font-size: 14px;
      line-height: 16px;
      -webkit-box-shadow: 0 0 0 50px #fffdf4 inset;
    }
    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }
  &__note-text {
    font-size: 14px;
    line-height: 18px;
    flex-shrink: 0;
    &_left {
      margin-right: 4px;
    }
    &_right {
      margin-left: 4px;
    }
  }
  &__icon {
    cursor: text;
    flex-shrink: 0;
    &_left {
      margin-right: 4px;
    }
    &_right {
      margin-left: 4px;
    }
    &_password {
      order: 1;
      margin: 0 -14px 0 4px;
      width: 39px;
      height: 37px;
      cursor: pointer;
    }
  }
}
</style>
