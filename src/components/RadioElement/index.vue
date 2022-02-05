<template>
  <label class="radio-element" @click="onClick">
    <input
      type="radio"
      class="radio-element__input"
      :value="value"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      @change="onChange"
    />
    <template v-if="this.$slots.default">
      <div class="radio-element__text">
        <!-- @slot Текст для радио-чекбокса-->
        <slot></slot>
      </div>
    </template>
  </label>
</template>

<docs>
  Стандартный вид радио-чекбокса:
  ```[import](./example/simple.vue)
  ```
</docs>

<script>
export default {
  name: 'RadioElement',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    /**
     * Атрибут name для радио-чекбокса
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * Атрибут value для радио-чекбокса
     */
    value: [String, Number],
    /**
     * v-model
     */
    checked: {
      type: Boolean,
      default: false
    },
    /**
     * Задизейблено
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    onChange(event) {
      this.$emit('change', event.target.checked, event.target.value)
    },
    onClick(event) {
      this.$emit('click')
    }
  }
}
</script>

<style lang="postcss">
.radio-element {
  display: flex;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
  &__input {
    width: 19px;
    height: 19px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0 7px 0 0;
    cursor: pointer;
    vertical-align: top;
    outline: none;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    &:checked {
      background-image: url('~@img/icon/circle.svg');
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 7px;
    }
    &:disabled {
      background-color: #f4f4f4;
      cursor: not-allowed;
      &:checked {
        background-image: svg-load('./icon/circle.svg', fill=#818181);
      }
      & ~ ^^&__text {
        color: #818181;
        cursor: not-allowed;
      }
    }
  }
  &__text {
    display: inline-block;
  }
}
</style>
