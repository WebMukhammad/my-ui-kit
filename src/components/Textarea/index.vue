<template>
  <div class="textarea" :class="[{ textarea_error: error, textarea_disable: disabled, textarea_dynamical: dynamicalHeight }]">
    <textarea
      ref="textarea"
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      :style="{ height: `${height}px`, minHeight: `${height}px`, resize }"
      class="textarea__field"
      :placeholder="placeholder"
      :disabled="disabled"
    ></textarea>
  </div>
</template>

<docs>
Пример поля с его value:
```[import](./example/example.vue)
```

Пример поля с состоянием ошибки:
```
<Textarea error placeholder="Введите подробное описание" />
```

Пример поля с ресайзом:
```
<Textarea resize="vertical"/>
```

Пример поля с динамической высотой:
```
<Textarea :height="43" dynamicalHeight />
```

Задизейбленное:
```
<Textarea disabled placeholder="Введите подробное описание" />
```
</docs>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    /**
     * Высота поля в пикселях
     */
    height: {
      type: Number,
      default: 150
    },
    /**
     * Изменение размеров поля
     * @values none, both, horizontal, vertical
     */
    resize: {
      type: String,
      default: 'none'
    },
    /**
     * Состояние ошибки
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Placeholder для поля ввода
     * @values true
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Задизейблено
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Изменять ли высоту текстариа динамичиски
     */
    dynamicalHeight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput(e) {
      this.dynamicalHeight && this.changeHeight()
      /**
       * Срабатывает при вводе нового значения
       * @property { value } - значение внутри инпута
       */
      this.$emit('input', e.target.value)
    },
    onBlur(e) {
      /**
       * Срабатывает при расфокуске поля
       * @property { event } - стандартный объект Event из обычного обработчика
       */
      this.$emit('blur', e)
    },
    changeHeight() {
      /**
       * При очистке поля в мобильных устройствах не сбрасывается высота.
       * Поэтому сначала сбрасываем полностью высоту, а потом вычисляем
       */
      this.$refs.textarea.style.height = '0px'
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px'
    }
  }
}
</script>

<style lang="postcss">
.textarea {
  &__field {
    width: 100%;
    padding: 10px 15px 12px;
    font-size: 14px;
    line-height: 21px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    outline: none;
    appearance: none;
    &::placeholder {
      color: #757575;
    }
    &:focus {
      border-color: #0e49fb;
    }
  }
  &_error {
    ^&__field {
      border-color: #f03d3d;
      &::placeholder {
        color: #c69898;
      }
    }
  }
  &_dynamical &__field {
    overflow: hidden;
  }
  &_disable {
    ^&__field {
      border-color: rgba(0, 0, 0, 0.13);
      cursor: not-allowed;
      background: repeating-linear-gradient(-45deg, #f4f4f4, #f4f4f4 6px, #fff 0, #fff 13px);
    }
  }
}
</style>
