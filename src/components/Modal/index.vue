<template>
  <transition
    :duration="{ enter: 400, leave: 400 }"
    :enter-class="`${entryAnimation}-enter`"
    :enter-active-class="`${entryAnimation}-enter-active`"
    :enter-to-class="`${entryAnimation}-enter-to`"
    :leave-class="`${exitAnimation}-leave`"
    :leave-active-class="`${exitAnimation}-leave-active`"
    :leave-to-class="`${exitAnimation}-leave-to`"
  >
    <div
      class="modal-overlay modal-overlay_full"
      :class="{ 'modal-overlay_mobile-fullscreen': mobileFullscreen }"
      v-if="show"
      :style="{ padding: padding }"
      @click="onOverlayClick"
    >
      <div :class="['modal', modalType]" :style="{ maxWidth: maxWidth }">
        <div class="modal__head">
          <slot name="title">
            <h4 class="h4">{{ title }}</h4>
          </slot>
          <div class="modal__close" @click="onCloseClick"></div>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<docs>

  Модальное окно:
  ```[import](./example/fullscreen.vue)
  ```

  Длинное модальное окно:
  ```[import](./example/long.vue)
  ```

  Модальное окно исчезающее слева:
  ```[import](./example/backOutLeft.vue)
  ```

  Модальное окно снизу:
  ```[import](./example/bottom.vue)
  ```
</docs>

<script>
/**
 * Модальные окна во весь экран
 */
export default {
  props: {
    /**
     * Показывать окно
     * @values true
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * Тип модального окна
     * @values bottom, fullscreen, long
     */
    type: {
      type: String,
      default: 'fullscreen'
    },
    /**
     * Тип анимации появления модального окна
     * @values fade-in-up, fade-in, custom-fade-in-up, fade-in-down, fade-in-left-big, bounce-in-up
     */
    entryAnimation: {
      type: String,
      default: 'custom-fade-in-up',
      validator: (val) => {
        return ['fade-in-up', 'fade-in', 'custom-fade-in-up', 'fade-in-down', 'bounce-in-up', 'fade-in-left-big'].some((el) => el === val)
      }
    },
    /**
     * Тип анимации скрытия модального окна
     * @values fade-out-down, fade-out, custom-fade-out-down, fade-out-left-big, bounce-out-down
     */
    exitAnimation: {
      type: String,
      default: 'custom-fade-out-down',
      validator: (val) => {
        return ['fade-out-down', 'fade-out', 'custom-fade-out-down', 'bounce-out-down', 'fade-out-left-big'].some((el) => el === val)
      }
    },
    /**
     * Внутренний отступ
     */
    padding: {
      type: String,
      default: null
    },
    /**
     * Текст для заголовка окна
     */
    title: {
      type: String,
      default: 'Заголовок модального окна'
    },
    /**
     * Максимальная ширина окна
     */
    maxWidth: {
      type: String,
      default: null
    },
    /**
     * Пропс делающий модалку на всю высоту экрана
     */
    mobileFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalType: {
        [`modal_${this.type}`]: this.type,
        'modal_mobile-fullscreen': this.mobileFullscreen
      }
    }
  },
  methods: {
    onCloseClick() {
      this.close()
    },
    close() {
      /**
       * Вызывается при закрытии окна
       */
      this.$emit('close')
    },
    onOverlayClick(e) {
      const isOverlay = e.target.classList.contains('modal-overlay')
      if (isOverlay) this.close()
    }
  }
}
</script>

<style lang="postcss">
@import './../../assets/lib/z-index.css';

.modal {
  width: 100%;
  margin: auto;
  padding: 28px 30px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  box-sizing: border-box;
  &_fullscreen {
    max-width: 533px;
  }
  &_bottom {
    max-width: none;
    margin: auto 0 0 0;
    border-radius: 0;
  }
  &_long {
    margin: 35px auto 0;
    max-width: 533px;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  &__close {
    width: 12px;
    height: 21px;
    margin-left: 11px;
    flex-shrink: 0;
    background-image: svg-load('./icon/close.svg');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: auto 12px;
    cursor: pointer;
    position: relative;
    top: 2px;
    &:hover {
      background-image: svg-load('./icon/close.svg', fill=#ee272d);
      transition: background-image 0.2s ease-out;
    }
  }
  &__body {
    margin-top: 12px;
  }
  @media (max-width: 900px) {
    &_mobile-fullscreen {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      max-width: 100%;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      ^&__head {
        flex-shrink: 0;
      }
      ^&__body {
        flex-grow: 1;
      }
    }
  }
  @media (max-width: 800px) {
    padding: 19px 15px 24px;
    &_long {
      margin: 0;
      height: auto;
      max-width: 100%;
    }
    &_fullscreen,
    &_bottom {
      max-width: 100% !important;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
  }
}

.modal {
  &-overlay {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    opacity: 1;
    box-sizing: border-box;
    overflow-y: scroll;
    z-index: var(--z-above-modal);
    margin-right: -20px;
    padding-right: 20px;
    will-change: transform, opacity;
    &_full {
      position: fixed;
      left: 0;
      bottom: 0;
      /* Оставляем 100vh, на случай, если не сработает -webkit-fill-available */
      min-height: 100vh;
      min-height: -webkit-fill-available;
      background-color: rgba(255, 255, 255, 0.88);
    }
  }

  @media (max-width: 900px) {
    &-overlay {
      padding-top: 8px;
    }
  }

  @media (max-width: 800px) {
    margin: initial;
    /* Стиль для того чтобы прибивать модалки к низу на мобильном разрешении */
    margin-top: auto;
  }
}

/* Кастомная анимация появления */
@keyframes customFadeInUp {
  from {
    transform: translateY(70px);
  }

  to {
    transform: translateY(0);
  }
}

/* Кастомная анимация исчезновения */
@keyframes customFadeOutDown {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(70px);
  }
}

.custom-fade-out-down-leave-active,
.custom-fade-in-up-enter-active {
  transition: opacity 0.4s;
  .modal {
    animation: 0.3s customFadeInUp;
  }
}

.custom-fade-in-up-enter,
.custom-fade-out-down-leave-active {
  opacity: 0;
  .modal {
    animation: 0.3s customFadeOutDown;
  }
}

.fade-in-enter-active {
  animation: 0.15s fadeIn;
  .modal {
    animation: 0.4s fadeIn;
  }
}

.fade-out-leave-to {
  animation: 0.2s 0.25s fadeOut;
  .modal {
    animation: 0.4s fadeOut;
  }
}

.fade-in-up-enter-active {
  animation: 0.15s fadeIn;
  .modal {
    animation: 0.4s fadeInUp;
  }
}

.fade-in-down-enter-active {
  animation: 0.15s fadeIn;
  .modal {
    animation: 0.4s fadeInDown;
    @media (max-width: 800px) {
      animation: 0.4s bounceInUp;
    }
  }
}

.fade-out-down-leave-to {
  animation: 0.2s 0.25s fadeOut;
  .modal {
    animation: 0.4s fadeOutDown;
  }
}

.bounce-in-up-enter-active {
  animation: 0.15s fadeIn;
  .modal {
    animation: 0.4s bounceInUp;
  }
}

.bounce-out-down-leave-to {
  animation: 0.2s 0.25s fadeOut;
  .modal {
    animation: 0.4s bounceOutDown;
  }
}

.fade-in-left-big-enter-active {
  animation: 0.15s fadeIn;
  .modal {
    animation: 0.4s fadeInLeftBig;
    @media (max-width: 800px) {
      animation: 0.4s customFadeOutDown;
    }
  }
}

.fade-out-left-big-leave-to {
  animation: 0.2s 0.25s fadeOut;
  .modal {
    animation: 0.4s fadeOutLeftBig;
    @media (max-width: 800px) {
      animation: 0.4s fadeOut;
    }
  }
}
</style>
