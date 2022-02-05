<template>
  <form
    :autocomplete="autocomplete"
    :class="['form', `form_${type}`, `form_title-width-${widthTitle}`, { 'form_adaptive-w900': adaptiveOn900 }]"
    @submit="onSubmit($event)"
  >
    <!-- @slot Содержимое формы, составляется из компонентов FormElement -->
    <slot></slot>
  </form>
</template>

<docs>
  Для всех форм ниже сделана валидация, правила валидации и прочее можно посмотреть в документации [Vee-Validate](https://logaretm.github.io/vee-validate/).
  После отправки данных форма блокируется и выводится информация об успешной отправке данных. Если изменить любое значения формы после, форма разблокируется

  Форма с полями и заголовками друг под другом:
  ```[import](./example/vertical.vue)
  ```

  Поля и заголовки в одном ряду:
  ```[import](./example/horizontal.vue)
  ```

  Все поля формы одним рядом:
  ```[import](./example/inline.vue)
  ```

  Сохранение состояния формы после перезагрузки:
  ```[import](./example/saveState.vue)
  ```
</docs>

<script>
/**
 * Компонент-обёртка для форм
 */
export default {
  name: 'Form',
  props: {
    /**
     * Тип формы
     * @values inline, horizontal, vertical
     */
    type: {
      type: String,
      default: 'horizontal'
    },
    /**
     * Класс для адаптации формы на разрешении экрана в 900px. Введён для оформления заказа. Если передать этот пропс, заголовки встанут над полями при разрешении 900px
     * @values adaptiveOn900
     */
    adaptiveOn900: {
      type: Boolean,
      default: false
    },
    /**
     * Атрибут передается напрямую в form
     */
    autocomplete: {
      type: String,
      default: null
    },
    /**
     * Ширина заголовка формы
     * @values 120, 130, 140, 150, 160, 170, 180
     */
    widthTitle: {
      type: String,
      default: '120',
      validator(value) {
        return ['120', '130', '140', '150', '160', '170', '180'].some((el) => el === value)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      /**
       * Срабатывает при успешной отправки формы
       * @property { event } прокидывается обычный event стандартного обработчика
       */
      this.$emit('submit', e)
    }
  }
}
</script>

<style lang="postcss">
.form {
  &_horizontal {
    .form-element__row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .form-element__title {
      min-height: 39px;
      margin-top: 2px;
      margin-bottom: 0;
      padding-right: 10px;
      display: flex;
      align-items: center;
      align-self: flex-start;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .form-element__field {
      align-items: flex-start;
    }
    .form-element__hints_not-label {
      padding-left: 0;
    }
    @each $width in 120, 130, 140, 150, 160, 170, 180 {
      /* prettier-ignore */
      &.form_title-width-$(width) {
        .form-element__title {
          width: $(width)px;
        }
        .form-element__field {
          max-width: calc(100% - $(width)px);
        }
        .form-element__hints {
          padding-left: $(width)px;
        }
      }
    }
  }
  &_inline {
    margin-right: -15px;
    display: flex;
    .form-element__row {
      margin-right: 15px;
      margin-bottom: 0;
    }
    .button {
      margin-right: 15px;
      margin-bottom: 15px;
      align-self: flex-end;
    }
    /* для того, чтобы перезаписать стили для элементов, которые добавляет валидатор */
    > span {
      display: block;
    }
  }
  &__button {
    margin-top: 7px;
  }
  @media (max-width: 900px) {
    &_adaptive-w900 {
      margin-right: 0;
      display: block;
      .form-element__row {
        margin-right: 0;
        margin-bottom: 10px;
      }
      @each $width in 120, 130, 140, 150, 160, 170, 180 {
        /* prettier-ignore */
        &.form_title-width-$(width) {
          .form-element__title {
            margin-bottom: 5px;
            width: 100%;
            min-height: 0;
          }
          .form-element__field {
            max-width: none;
          }
          .form-element__hints {
            padding-left: 0;
          }
        }
      }
    }
  }
}
</style>
