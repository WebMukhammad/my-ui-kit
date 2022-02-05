<template>
  <div :class="['radio-list', { [`radio-list_column-${column}`]: column }]">
    <div v-for="item in list" :key="item.value" class="radio-list__el">
      <RadioElement :name="name" @change="onChange" :value="item.value" :disabled="disabled" :checked="shouldBeChecked(item.value)">
        {{ item.name }}
      </RadioElement>
    </div>
  </div>
</template>

<docs>
  Выбранное Значение привязано к данным:
  ```[import](./example/modelSample.vue)
  ```
  
  Пример списка с двумя колонками:
  ```[import](./example/radioListColumn.vue)
  ```
</docs>

<script>
import RadioElement from '@src/components/RadioElement'
export default {
  name: 'RadioList',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  components: {
    RadioElement
  },
  props: {
    /**
     * Массив на основе которого строится список, состоит из объектов со свойствами name и value
     */
    list: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Пропс, выстраивающий radio в колонки
     * @values 2, 3
     */
    column: {
      type: String,
      default: null
    },
    /**
     * Атрибут name
     */
    name: String,
    modelValue: [Number, String],
    /**
     * Задизейблено
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange(checked, value) {
      /**
       * Срабатывает при изменении значения в радио-списке
       * @property { value } - выбранное значение
       */
      this.$emit('change', value, checked)
    },
    shouldBeChecked(val) {
      return this.modelValue === val
    }
  }
}
</script>

<style lang="postcss">
.radio-list {
  &__el {
    margin-bottom: 7px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &_column {
    &-2 {
      display: grid;
      grid-gap: 0 10px;
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 800px) {
        grid-template-columns: auto;
      }
    }
    &-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 0 10px;
      @media (max-width: 800px) {
        grid-template-columns: auto;
      }
    }
  }
}

.radio {
  display: flex;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
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
