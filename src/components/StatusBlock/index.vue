<template>
  <div :class="['status', { [`status_size-${size}`]: size }]" :style="{ width, margin, padding }">
    <div :class="['status__icon', { [`status__icon_${type}`]: type }]"></div>
    <p :class="['status__title', { [`status__title_${type}`]: type }]">
      {{ defaultTitle ? defaultTitle : title }}
    </p>
    <template v-if="description || this.$slots.default">
      <div class="p status__description">
        <!-- @slot Текст для компонента загрузки и ошибок-->
        <slot>
          {{ description }}
        </slot>
      </div>
    </template>
  </div>
</template>

<docs>
  Все состояния
  ```[import](./states/states.vue)
  ```
</docs>

<script>
export default {
  props: {
    /**
     * Тип состояния
     * @values error, warning, loading, empty
     */
    type: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Размер состояния
     * @values s, m, l
     */
    size: {
      type: String,
      required: true,
      default: null
    },
    /**
     * Заголовок состояния
     *
     */
    title: {
      type: String,
      default: null
    },
    /**
     * Описание состояния
     */
    description: {
      type: String,
      default: null
    },
    /**
     * Ширина текстового содержимого
     */
    contentWidth: {
      type: String
    },
    /**
     * Внешний отступ
     */
    margin: {
      type: String,
      default: '0 auto'
    },
    /**
     * Внутренний отступ
     */
    padding: {
      type: String,
      default: null
    }
  },
  computed: {
    defaultTitle() {
      if (this.type === 'loading' && !this.title) {
        return 'Идёт загрузка'
      }
      if (this.type === 'error' && !this.title) {
        return 'Ошибка'
      }
      if (this.type === 'empty' && !this.title) {
        return 'Нет данных'
      }
      if (this.type === 'warning' && !this.title) {
        return 'Внимание'
      }
      return null
    },
    width() {
      return this.size !== 's' ? this.contentWidth : null
    }
  }
}
</script>

<style lang="postcss" scoped>
.status {
  text-align: center;
  &__icon {
    &_loading {
      height: 80px;
      background: url('data:image/gif;base64,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')
        no-repeat 50%;
      background-size: 75px;
    }
    &_error {
      height: 90px;
      background: svg-load('./icon/error.svg', fill=#fff) no-repeat center;
      background-size: contain;
    }
    &_empty {
      height: 80px;
      background: svg-load('./icon/empty.svg') no-repeat center;
      background-size: contain;
    }
    &_warning {
      height: 90px;
      background: svg-load('./icon/alert.svg', fill=#fff) no-repeat center;
      background-size: contain;
    }
  }
  &__title {
    margin: 12px auto 0;
    font-weight: 500;
    &_error {
      color: #e30613;
    }
    &_warning {
      color: #eb8307;
    }
  }
  &__description {
    margin-top: 5px;
  }
  &_size-s {
    display: inline-flex;
    align-items: center;
    vertical-align: bottom;
    ^&__icon {
      margin-bottom: 0;
      background-size: contain;
      &_loading {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background: svg-load('./icon/loading-small.svg', fill=#949494) no-repeat left;
      }
      &_error {
        width: 18px;
        height: 16px;
        margin-right: 4px;
        margin-bottom: 1px;
        background: svg-load('./icon/error-small.svg', fill=#e30613) no-repeat left;
      }
      &_empty {
        width: 16px;
        height: 19px;
        margin-right: 6px;
        background: svg-load('./icon/empty-small.svg') no-repeat left;
      }
      &_warning {
        width: 16px;
        height: 19px;
        margin-right: 6px;
        margin-bottom: 1px;
        background: svg-load('./icon/alert-small.svg', fill=#eB8307) no-repeat left;
      }
    }
    ^&__title {
      margin: 0;
      font-size: 14px;
      line-height: inherit;
    }
    ^&__description {
      display: none;
    }
  }
  &_size-m {
    padding: 55px 20px;
    ^&__icon {
      &_loading {
        height: 21px;
        background-size: 45px;
      }
    }
    ^&__title {
      font-size: 19px;
      line-height: 21px;
    }
  }
  &_size-l {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 55px 20px;
    ^&__title {
      font-size: 29px;
      line-height: 33px;
      &_loading {
        display: none;
      }
    }
  }
}
</style>
