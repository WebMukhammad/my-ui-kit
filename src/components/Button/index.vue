<template>
  <button
    :is="tag"
    :style="{ borderRadius }"
    :class="[{ [`button_icon-${this.iconPosition}`]: this.iconPosition }, getClasses]"
    :disabled="disabled"
    @click="onButtonClick"
  >
    <span v-if="icon" class="button__icon" :class="getIconClass" />
    <!-- @slot Текст для компонента кнопки без иконки -->
    <slot>Текст на кнопке</slot>
  </button>
</template>

<docs>
  Стандартный вид кнопки:
  ```
  <Button>Кастомный текст</Button>
  ```

  Кнопки разной размерности
  ```
  <Button size="33" class="mb-10"/>
  <Button size="39" class="mb-10"/>
  <Button size="49" class="mb-10"/>
  ```

  Кнопка с максимальной шириной
  ```
  <Button fluid/>
  ```

  Кнопки разного цвета
  ```
  <Button theme="red" class="mb-10"/>
  <Button theme="blue" class="mb-10"/>
  <Button theme="white" class="mb-10"/>
  <Button theme="green" class="mb-10"/>
  ```

  Кнопка с иконкой справа
  ```
  <Button icon="arrow-right" iconPosition="right"/>
  ```

  Разного цвета с индикаторами загрузки
  ```
  <Button theme="red" loading class="mb-10"/>
  <Button theme="blue" loading class="mb-10"/>
  <Button theme="white" loading class="mb-10"/>
  <Button theme="green" loading class="mb-10"/>
  ```

  Кнопка с иконкой
  ```
  <Button icon="add"/>
  <Button theme="blue" icon="add" class="mb-10"/>
  <Button theme="white" icon="add"  class="mb-10"/>
  <Button theme="green" icon="add" class="mb-10"/>
  ```

  Задизебленная кнопка
  ```
  <Button icon="add" disabled/>
  ```
</docs>

<script>
export default {
  name: 'Button',
  props: {
    /**
     * Стиль кнопки
     * @values red, white, blue, green, submited
     */
    theme: {
      default: 'red',
      type: String
    },
    tag: {
      type: String,
      default: 'button'
    },
    /**
     * Размер кнопки, цифра отображает высоту, но поддерживается ограниченное кол-во
     * @values 33, 39, 49
     */
    size: {
      default: '39',
      type: String
    },
    /**
     * Ширина кнопки
     * @values true, false
     */
    fluid: {
      default: false,
      type: Boolean
    },
    /**
     * Кнопка с лоайдером вместо текста
     * @values true, false
     */
    loading: {
      default: false,
      type: Boolean
    },
    /**
     * Задизейбленая кнопка
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Иконка
     * @values add, close, book, arrow-right
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * С какого края отображать иконку в кнопке
     * @values left, right
     */
    iconPosition: {
      type: String,
      default: 'left'
    },
    /**
     * Кастомный border-radius у кнопки
     */
    borderRadius: {
      type: String,
      default: null
    }
  },
  data() {
    return {}
  },
  computed: {
    getClasses() {
      return [`button_${this.theme}`, `button_h-${this.size}`, 'button', { button_loading: this.loading }, { button_fluid: this.fluid }]
    },
    getIconClass() {
      if (this.disabled) {
        return `icon-${this.icon} icon-${this.icon}_disabled`
      } else {
        return this.theme === 'white' || this.theme === 'transparent'
          ? `icon-${this.icon} icon-${this.icon}_black`
          : `icon-${this.icon} icon-${this.icon}_white`
      }
    }
  },
  methods: {
    onButtonClick(e) {
      /**
       * Активируется при клике на кнопку
       * @property { event } станадртный Event
       */
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="postcss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  border: 1px solid transparent;
  &_h-49 {
    font-size: 20px;
    line-height: 23px;
    padding: 12px 26px;
    border-radius: 5px;
  }
  &_h-39 {
    font-size: 16px;
    line-height: 19px;
    padding: 9px 21px;
    border-radius: 4px;
  }
  &_h-33 {
    font-size: 14px;
    line-height: 17px;
    padding: 8px 13px 6px;
    border-radius: 3px;
  }
  &_fluid {
    width: 100%;
  }
  &_loading {
    background-image: url('~@img/icon/loading-dots.svg');
    background-repeat: no-repeat;
    background-size: auto 9px;
    background-position: 50% 50%;
    color: transparent;
    &.button_h-39 {
      background-size: auto 9px;
    }
    &.button_h-33 {
      background-size: auto 8px;
    }
    ^&__icon {
      display: none;
    }
  }
  &_red {
    background-color: #e30613;
    &:hover {
      background-color: #ff0008;
      transition: background-color 0.2s ease-out;
    }
    &:active {
      background-color: #a9070c;
    }
    &.button_loading {
      background-color: #e30613;
    }
  }
  &_white {
    background-color: transparent;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.07);
    &:hover {
      background-color: #fffae5;
      border: 1px solid rgba(0, 0, 0, 0.13);
      transition: background-color 0.2s ease-out, border 0.2s ease-out;
    }
    &:active {
      border: 1px solid transparent;
      background-color: #e3dfcd;
    }
    &.button_loading {
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.07);
      background-image: svg-load('./icon/loading-dots.svg', fill=#000);
      color: transparent;
    }
  }
  &_blue {
    background-color: #4584e5;
    &:hover {
      background-color: #1470ff;
      transition: background-color 0.2s ease-out;
    }
    &:active {
      background-color: #3765ab;
    }
    &.button_loading {
      background-color: #4584e5;
    }
  }
  &_green,
  &_submited {
    background-color: #11c86f;
  }
  &_green {
    &:hover {
      background-color: #0ecf71;
      transition: background-color 0.2s ease-out;
    }
    &:active {
      background-color: #0da85d;
    }
    &.button_loading {
      background-color: #11c86f;
    }
  }
  &:disabled:not(.button_submited) {
    border: 1px solid rgba(0, 0, 0, 0.13);
    color: rgba(0, 0, 0, 0.26);
    cursor: not-allowed;
    background: repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 6px, transparent 6px, transparent 13px);
    &:hover,
    &:active {
      border: 1px solid rgba(0, 0, 0, 0.13);
      transition: border 0.2s ease-out;
    }
  }
  &__icon {
    position: relative;
    margin-right: 4px;
  }
  &_icon-right {
    ^&__icon {
      order: 1;
      margin-left: 7px;
    }
  }
}
/*
  специфичное позиционирование конкретных иконок, для нормального их отображения 
*/
.button_h-49 {
  .icon-arrow-right {
    top: 2px;
  }
}
</style>
