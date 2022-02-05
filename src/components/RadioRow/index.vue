<template>
  <div class="filters">
    <button
      v-for="item in list"
      :key="item.value"
      :class="['filters__button', { filters__button_active: value === item.value }]"
      @click="onClick(item.value)"
      type="button"
    >
      <!-- @slot Текст для кнопок-->
      <slot :item="item">
        {{ item.name }}
      </slot>
    </button>
  </div>
</template>

<docs>
  Выбранное Значение привязано к данным:
  ```[import](./example/modelSample.vue)
  ```
</docs>

<script>
export default {
  name: 'RadioRow',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Структура массива
     * [
     *  {
     *    name: 'name',
     *    value: 'value'
     *  },
     *  ...
     * ]
     */
    list: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Пропс для v-model
     */
    value: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    onClick(val) {
      /**
       * Срабатывает при изменении значения на кнопке
       * @property { val } - выбранное значение
       */
      this.$emit('change', val)
    },
    shouldBeChecked(val) {
      return this.modelValue === val
    }
  }
}
</script>
<style lang="postcss" scoped>
.filters {
  display: flex;
  font-size: 14px;
  line-height: 16px;
  &__button {
    position: relative;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    border-left-color: #fff;
    padding: 0 16px;
    height: 39px;
    cursor: pointer;
    outline: none;
    flex-shrink: 0;
    flex-grow: 1;
    font-size: 14px;
    &:first-child {
      border-left-color: #e5e5e5;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &_active {
      position: relative;
      color: #e30613;
      &:first-child {
        &::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 100%;
          height: 100%;
          z-index: 1;
          border: 1px solid red;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }
      &:last-child {
        &::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -2px;
          width: calc(100% + 1px);
          height: 100%;
          z-index: 1;
          border: 1px solid red;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
      &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -2px;
        width: calc(100% + 1px);
        height: 100%;
        z-index: 1;
        border: 1px solid red;
      }
    }
  }
  @media (max-width: 1400px) {
    &__button {
      padding-left: 7px;
      padding-right: 7px;
    }
  }
}
</style>
