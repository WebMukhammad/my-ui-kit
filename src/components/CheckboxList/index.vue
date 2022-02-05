<template>
  <div :class="['checkbox-list', { 'checkbox-list_row': row, [`checkbox-list_column-${column}`]: column }]">
    <div
      v-for="item in list"
      :key="item[namePropValue]"
      :class="['checkbox-list__el', { 'checkbox-list__el_hover': item.hover }]"
      :style="{ margin: elementMargin }"
    >
      <Checkbox
        :name="name"
        :value="item[namePropValue]"
        @change="onCheckboxChange"
        :checked="modelValue.some((el) => el === item[namePropValue])"
      >
        {{ item.name }}
      </Checkbox>
    </div>
  </div>
</template>

<docs>
Пример списка с привязкой к данным:
```[import](./example/modelSample.vue)
```

Пример списка в горизонтальную линию:
```[import](./example/checkboxListRow.vue)
```

Пример списка с двумя колонками:
```[import](./example/checkboxListColumn.vue)
```
</docs>

<script>
import Checkbox from '@src/components/Checkbox'

export default {
  name: 'CheckboxList',
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  components: {
    Checkbox
  },
  props: {
    /**
     * Пропс, выстраивающий чекбоксы в горизонтальную линию
     */
    row: {
      type: Boolean,
      default: false
    },
    /**
     * Пропс, выстраивающий checkbox в колонки
     * @values 2, 3
     */
    column: {
      type: String,
      default: null
    },
    /**
     * Пропс, позволяющий задавать кастомные margin'ы для чекбоксов
     */
    elementMargin: {
      type: String,
      default: null
    },
    /**
     * Массив с данными для чекбоксов, массив состоит из объектов у объектов свойства name и value
     */
    list: Array,
    /**
     * Атрибут name у чекбокса
     */
    name: String,
    modelValue: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Состояние чекбокса
     * @values true, false
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Название свойства для значения элемента
     */
    namePropValue: {
      type: String,
      default: 'value'
    }
  },
  methods: {
    onCheckboxChange(checked, value) {
      if (checked) {
        this.modelValue.push(value)
      } else {
        this.modelValue.splice(this.modelValue.indexOf(value), 1)
      }

      /**
       * Вызывается при изменении значения чекбокс
       * @property { object } значение из модели
       */
      this.$emit('change', this.modelValue)
    }
  }
}
</script>

<style lang="postcss">
.checkbox-list {
  &__el {
    margin-bottom: 7px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &_row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
  /* Cтили для чекбоксов в селекте */
  &_inside-select {
    ^&__el {
      margin-bottom: 0;
      &_hover {
        background-color: #fffae5;
      }
    }
    .checkbox {
      padding: 7px 14px;
    }
  }
}
</style>
