<template>
  <div class="form-element__row">
    <div class="form-element__title" v-if="title || $slots.title" :style="{ minHeight: this.titleMinHeight }">
      <slot name="title">
        <div>
          {{ title }}
          <span v-if="required" class="red-text">*</span>
        </div>
      </slot>
    </div>
    <div class="form-element__field">
      <!-- @slot Поле формы -->
      <slot></slot>
    </div>
    <div :style="{ minHeight: hintMinHeight }" class="form-element__hints" :class="{ 'form-element__hints_not-label': !this.title }">
      <div class="form-element__error-text" v-if="error || $slots.error">
        <!-- @slot Текст для ошибки элемента формы -->
        <slot name="error">
          {{ error }}
        </slot>
      </div>
      <div class="form-element__helper-text" v-else-if="helper || $slots.helper">
        <!-- @slot Текст для подсказки элемента формы -->
        <slot name="helper">
          {{ helper }}
        </slot>
      </div>
    </div>
  </div>
</template>

<docs>
  Поле ввода:
  ```
  <FormElement>
    <InputText placeholder="Введите город" />
  </FormElement>
  ```

  Поле ввода с показом на обязательность заполнения:
  ```
  <FormElement required title="Введите город:">
    <InputText />
  </FormElement>
  ```

  Поле ввода с подсказкой
  ```
  <FormElement helper="Подсказка для поля ввода">
    <InputText/>
  </FormElement>
  ```

  Поле ввода с ошибкой:
  ```
  <FormElement error="У вас в поле ошибка">
    <InputText placeholder="Введите город" error />
  </FormElement>
  ```

  Поле ввода с подсказкой из слота
  ```
  <FormElement>
    <InputText/>
    <template #helper>Подсказка для поля ввода</template>
  </FormElement>
  ```

  Другой тип поля, например, чеклист:
  ```
  <FormElement helper="Подсказка для чеклиста">
    <CheckboxList :list="[
        { name: 'Махачкала', value: 1 },
        { name: 'Ижевск', value: 2 },
        { name: 'Москва', value: 3 },
      ]"/>
  </FormElement>
  ```
</docs>

<script>
export default {
  name: 'FormElement',
  props: {
    /**
     * Класс для адаптации заголовков элемента формы
     * @values Нужная нам высота
     */
    titleMinHeight: {
      type: String,
      default: null
    },
    /**
     * Текст ошибки для поля ввода
     */
    error: {
      type: String,
      default: null
    },
    /**
     * Текст подсказки для поля ввода
     */
    helper: {
      type: String,
      default: null
    },
    /**
     * Заголовок элемента формы
     */
    title: {
      type: String,
      default: null
    },
    /**
     * Добавления * в конец названия поля на обязательность заполнения
     */
    required: {
      type: Boolean,
      default: false
    },
    /**
     * Кастомный min-height у хинта
     */
    hintMinHeight: {
      type: String,
      default: '13px'
    }
  }
}
</script>

<style lang="postcss">
.form-element {
  &__row {
    display: block;
    margin-bottom: 10px;
    flex-grow: 1;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 5px;
    flex-shrink: 0;
  }
  &__field {
    flex-grow: 1;
  }
  &__error-text,
  &__helper-text {
    font-size: 11px;
    line-height: 13px;
    font-style: italic;
  }
  &__error-text {
    color: #e6110f;
  }
  &__helper-text {
    color: #757575;
  }
  &__hints {
    width: 100%;
    min-height: 13px;
    margin-top: 2px;
  }
}
</style>
