<template>
  <div class="tooltip p" :class="[{ tooltip_active: isActive }]">
    <div class="tooltip__handler" ref="handler">
      <!-- @slot Элемент-активатор тултипа -->
      <slot name="handler">Наведите для показа тултипа</slot>
    </div>
    <div class="tooltip__content" :style="{ maxWidth: widthTool, padding: padding }" ref="content">
      <!-- @slot Контент тултипа -->
      <slot name="content">Контент тултипа</slot>
    </div>
  </div>
</template>

<docs>
  Тултип при наведении:
  ```[import](./example/hover.vue)
  ```

  Тултип при клике:
  ```[import](./example/click.vue)
  ```

  Пример использования тултипа где-то посреди большого абзаца:
  ```[import](./example/description.vue)
  ```
</docs>

<script>
import { createPopper } from '@popperjs/core'
import hoverintent from 'hoverintent'

/**
 * Тултип при наведении, внутри тултипа можно вывести любой контент
 */
export default {
  name: 'Tooltip',
  props: {
    /**
     * Предпочитаемое место появления
     * @values top, bottom, left, right
     */
    placement: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].some((el) => el === value)
      }
    },
    /**
     * При каком событии будет появляться тултип
     * @values hover, click
     */
    event: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['hover', 'click'].some((el) => el === value)
      }
    },
    /**
     * Максимальная ширина тултипа
     */
    widthTool: {
      type: String,
      default: '180px'
    },
    /**
     * Внутренний отступ
     */
    padding: {
      type: String,
      default: '5px 10px'
    },
    /**
     * Отступ между Tooltip'ом и краем окна браузера
     */
    offsetWindow: {
      type: [Number, Object],
      default: 10
    }
  },
  mounted() {
    switch (this.event) {
      case 'hover':
        this.$hoverintent = hoverintent(this.$refs.handler, this.enable, this.disable)
        break
      case 'click':
        this.$refs.handler.addEventListener('click', this.enableClickHandler)
        break
    }
  },
  destroyed() {
    window.removeEventListener('click', this.onWindowClick)
    this.destroy()
    if (this.$hoverintent) this.$hoverintent.remove()
  },
  data() {
    return {
      instance: null,
      isActive: false
    }
  },
  methods: {
    init() {
      if (!this.instance) {
        this.instance = createPopper(this.$refs.handler, this.$refs.content, {
          placement: this.placement,
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 5]
              }
            },
            {
              name: 'preventOverflow',
              options: {
                padding: this.offsetWindow
              }
            }
          ]
        })
      }
    },
    destroy() {
      if (this.instance) {
        this.instance.destroy()
        this.instance = null
      }
    },
    enable() {
      this.init()
      this.isActive = true
    },
    disable() {
      this.destroy()
      this.isActive = false
    },
    enableClickHandler() {
      window.addEventListener('click', this.onWindowClick)
      this.enable()
    },
    disabledClickHandler() {
      window.removeEventListener('click', this.onWindowClick)
      this.disable()
    },
    onHandlerClick() {
      this.isActive ? this.disabledClickHandler() : this.enableClickHandler()
    },
    onWindowClick({ target }) {
      const tooltip = target.closest('.tooltip')
      const notInsideCurrentTooltip = tooltip !== this.$el
      if (notInsideCurrentTooltip) this.disabledClickHandler()
    }
  }
}
</script>

<style lang="postcss">
.tooltip {
  &_active {
    ^&__content {
      visibility: visible;
      opacity: 1;
    }
  }
  &__handler {
    display: inline-block;
    cursor: pointer;
  }
  &__content {
    padding: 5px 10px;
    position: absolute;
    top: -9999px;
    left: -9999px;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    line-height: 18px;
    background-color: rgba(0, 0, 0, 0.89);
    transition-property: visibility, opacity;
    outline: 0;
    box-sizing: border-box;
    visibility: hidden;
    opacity: 0;
    display: block;
  }
}
</style>
