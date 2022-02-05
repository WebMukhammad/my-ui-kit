<template>
  <div class="popover">
    <span ref="handler" class="popover__handler">
      <!-- @slot Элемент, при клике на который будет происходить активация окна -->
      <slot name="handler"></slot>
    </span>
    <transition
      name="popover-toggle"
      :enter-class="`${entryAnimation}-enter`"
      :enter-active-class="`${entryAnimation}-enter-active`"
      :enter-to-class="`${entryAnimation}-enter-to`"
      :leave-class="`${exitAnimation}-leave`"
      :leave-active-class="`${exitAnimation}-leave-active`"
      :leave-to-class="`${exitAnimation}-leave-to`"
      @after-leave="afterTransitionLeave"
      @enter="onTransitionEnter"
    >
      <div ref="content" class="popover__modal p" v-if="active" :style="{ width: width, padding: padding, overflow: overflow }">
        <div class="popover__head" v-if="title">
          {{ title }}
        </div>
        <!-- @slot Содержимое окна -->
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<docs>
  Базовый всплывающий тултип:
  ```[import](./example/simple.vue)
  ```

  Тултип всплывающий при наведении:
  ```[import](./example/hover.vue)
  ```
</docs>

<script>
/**
 * Компонент для всплывающих элементов рядом с другими элементами, например для каких-то мелких форм для которых не нужны полноценные всплывающие окна
 */

import { createPopper } from '@popperjs/core'

export default {
  name: 'Popover',
  props: {
    /**
     * Заголовок для всплывашки
     */
    title: {
      type: String,
      default: null
    },
    /**
     * Предпочитаемая сторона появления
     */
    placement: {
      type: String,
      default: 'bottom'
    },
    /**
     * Событие, при котором будет происходить активация окна
     * @values click, hover
     */
    event: {
      type: String,
      default: 'click'
    },
    /**
     * Время для таймера в мс, по истечении которого будет скрываться всплывашка, если курсор находится вне всплывашки
     */
    time: {
      type: Number,
      default: 300
    },
    /**
     * Ширина всплывашки
     */
    width: {
      type: String,
      default: '320px'
    },
    /**
     * Внутренний отступ
     */
    padding: {
      type: String,
      default: '17px 20px 24px'
    },
    /**
     * Состояние скролла
     */
    overflow: {
      type: String,
      default: 'visible'
    },

    /**
     * Показывать всплывашку
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * Отступ между вызывающим элементом и модалкой, считается по [это](https://popper.js.org/docs/v2/modifiers/offset/) технологии
     */
    offset: {
      type: Array,
      default() {
        return [0, 10]
      }
    },
    /**
     * Отступ между Popover'ом и краем окна браузера
     */
    offsetWindow: {
      type: [Number, Object],
      default: 10
    },
    /**
     * Дом нода, куда будет происходить перенос окна
     */
    appendTo: {
      default: null
    },
    /**
     * Тип анимации появления модального окна
     * @values fade-in
     */
    entryAnimation: {
      type: String,
      default: 'fade-in',
      validator: (val) => {
        return ['fade-in'].some((el) => el === val)
      }
    },
    /**
     * Тип анимации скрытия модального окна
     * @values fade-out
     */
    exitAnimation: {
      type: String,
      default: 'fade-out',
      validator: (val) => {
        return ['fade-out'].some((el) => el === val)
      }
    }
  },
  destroyed() {
    window.removeEventListener('click', this.onWindowClick)
    this.disablePopover()
    if (this.appendTo && this.$refs.content) {
      this.$refs.content.remove()
    }
  },
  data() {
    return {
      active: this.show,
      timer: null
    }
  },
  mounted() {
    const typeMethod = this.event === 'click' ? this.onHandlerClick : this.onHandlerHover
    const event = this.event === 'click' ? 'click' : 'mouseenter'
    window.requestAnimationFrame(() => this.$refs.handler.addEventListener(event, typeMethod))
  },
  methods: {
    onHandlerClick() {
      this.active = !this.active
    },
    onHandlerHover() {
      this.active = true
      window.addEventListener('mousemove', this.onWindowMouseover)
    },
    onWindowMouseover({ target }) {
      const $popoverModal = target.closest('.popover')
      if ($popoverModal === this.$el && this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      } else if ($popoverModal !== this.$el && !this.timer) {
        this.timer = setTimeout(() => {
          this.active = false
          window.removeEventListener('mousemove', this.onWindowMouseover)
        }, this.time)
      }
    },
    enable() {
      this.$emit('enable')
      this.enablePopover()
    },
    disable() {
      this.$emit('disable')
      this.disablePopover()
    },
    enablePopover() {
      this.$popover = createPopper(this.$refs.handler, this.$refs.content, {
        placement: this.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: this.offset
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
      window.requestAnimationFrame(() => {
        if (this.appendTo) this.appendTo.append(this.$refs.content)
        window.addEventListener('click', this.onWindowClick)
      })
    },
    disablePopover() {
      if (!this.$popover) return
      this.$popover.destroy()
      this.$popover = null
      window.removeEventListener('click', this.onWindowClick)
    },
    onWindowClick(e) {
      const $popoverModal = e.target.closest('.popover__modal')
      const notCurrentModal = $popoverModal !== this.$refs.content
      if (notCurrentModal) this.active = false
    },
    afterTransitionLeave() {
      this.disable()
    },
    onTransitionEnter() {
      this.enable()
    }
  }
}
</script>

<style lang="postcss">
@import './../../assets/lib/z-index.css';

.popover {
  display: inline-block;
  &__handler {
    display: inline-block;
  }
  &__modal {
    margin: auto;
    background: #ffffff;
    border: 1px solid #f2f2f2;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    position: absolute;
    z-index: var(--z-modal);
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.fade-in-enter-active {
  animation: 0.2s fadeIn;
}

.fade-out-leave-to {
  animation: 0.2s fadeOut;
}
</style>
