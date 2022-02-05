<template>
  <label class="checkbox">
    <input
      type="checkbox"
      class="checkbox__input"
      :value="value"
      :name="name"
      :checked="checked"
      :disabled="disabled"
      :style="{ marginRight: $scopedSlots.default ? '7px' : '0px' }"
      @change="onChange"
    />
    <template v-if="$scopedSlots.default">
      <span class="checkbox__text">
        <!-- @slot Текст для чекбокса-->
        <slot>{{ name }}</slot>
      </span>
    </template>
  </label>
</template>

<docs>
  Стандартный вид чекбокса:
  ```[import](./example/modelSample.vue)
  ```

  Задизейбленный чекбокс:
  ```
  <Checkbox disabled>Махачкала</Checkbox>
  ```
</docs>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    /**
     * Атрибут name для чекбокса
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * Атрибут value для чекбокса
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
     * Задизейбленный чекбокс
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
      this.$emit('change', event.target.checked, this.value)
    }
  }
}
</script>

<style lang="postcss">
.checkbox {
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
    border-radius: 4px;
    cursor: pointer;
    vertical-align: top;
    outline: none;
    flex-shrink: 0;
    &:checked {
      background-image: url('~@img/icon/tick.svg');
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 11px;
    }
    &:disabled {
      background-color: #f4f4f4;
      cursor: not-allowed;
      &:checked {
        background-image: svg-load('./icon/tick.svg', fill=#818181);
      }
      &:focus {
        border: 1px solid #0e49fb;
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
