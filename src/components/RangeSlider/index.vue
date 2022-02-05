// за основу для слайдера взят https://refreshless.com/nouislider/

<template>
  <div name="custom-slider">
    <input type="hidden" :class="inputClass" />
    <span style="position: absolute; top: -2.5rem">
      <!-- @slot Текст для компонента слайдера -->
      <slot></slot>
    </span>
  </div>
</template>

<docs>
  За основу для слайдера взят [https://refreshless.com/nouislider/](noUiSlider), поэтому все параметры очень похожи и можно спокойно обращаться к их api

  Слайдер с выбором одного значения
  ```[import](./example/oneHandle.vue)
  ```

  Слайдер с выбором промежутка
  ```[import](./example/twoHandle.vue)
  ```

  Слайдер с подсказками
  ```[import](./example/notch.vue)
  ```
</docs>

<script>
import noUiSlider from 'nouislider'
import throttle from 'lodash.throttle'
import isEqual from 'lodash.isequal'

export default {
  name: 'RangeSlider',
  model: {
    prop: 'handles',
    event: 'change'
  },
  props: {
    /**
     * Тема для слайдера, название темы встанет в начало всех классов. Например при теме "red" классы будут называться red-connect
     * @values red
     */
    theme: {
      type: String,
      default: 'noUi'
    },
    inputClass: {
      type: String,
      default: 'custom-slider-input'
    },
    inputName: {
      type: String,
      default: 'custom-slider-value'
    },
    options: {
      type: Object,
      default: () => ({
        start: [20, 80],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      })
    },
    vertical: {
      type: Boolean,
      default: false
    },
    handles: {
      type: [Number, Array],
      default() {
        return [0, 50]
      }
    },
    connect: {
      type: [Boolean, Array, String],
      default: false // validate values are boolean
    },
    tooltips: {
      type: [Boolean, Array],
      default: false // validate values are boolean
    },
    step: {
      type: Number,
      default: 0
    },
    range: {
      type: Object,
      required: true,
      validator: (value) => !Array.isArray(value) && typeof value === 'object'
    },
    pipsy: {
      type: [Boolean, Object],
      default: () => false,
      validator(value) {
        const isBoolean = typeof value === 'boolean'
        const notArray = !Array.isArray(value)
        return isBoolean || (notArray && typeof value === 'object')
      }
      // validator: (value) => ((typeof value === 'boolean' || !Array.isArray(value)) && typeof value === 'object')
    },
    rtl: {
      type: Boolean,
      default: false
    },
    // test below (set) prop for both types i.e. Number, Array
    set: {
      type: [Number, Array],
      default: null,
      validator: (value) => typeof value === 'number' || Array.isArray(value)
    },
    behaviour: {
      type: String,
      default: 'tap',
      validator: (value) => ['drag', 'tap', 'fixed', 'snap', 'none'].indexOf(value !== -1)
    }
  },
  created() {
    this.throttleUpdate = throttle(this.update, 50)
    this.optionz = Object.assign(
      {},
      this.options,
      this.$props,
      this.vertical && (this.options.orientation = 'vertical'),
      this.theme && (this.options.cssPrefix = this.theme + '-'),
      this.handles && (this.options.start = this.handles),
      this.rtl && (this.options.direction = 'rtl'),
      this.pipsy && !Object.keys(this.pipsy).length ? (this.options.pips = { mode: 'range', density: 5 }) : (this.options.pips = this.pipsy)
    )
  },
  mounted() {
    const slider = this.$el
    this.options.orientation === 'vertical' && (slider.style.height = '100%')
    noUiSlider.create(slider, this.optionz)
    slider.noUiSlider.on('slide', (values) => {
      this.currentValue = values
      this.throttleUpdate()
    })
  },
  data() {
    return {
      optionz: Object,
      fromEvent: false,
      currentValue: null
    }
  },
  watch: {
    handles(newValue) {
      if (!this.fromEvent) {
        this.$el.noUiSlider.set(newValue)
      }
      this.fromEvent = false
    },
    range(newRange, oldRange) {
      /**
       * Если после смены крайних значений они обновились, то нужно обновить value
       */
      if (!isEqual(newRange, oldRange)) {
        /**
         * Получаем текущие значения из слайдера
         */
        let currentValue = this.$el.noUiSlider.get()
        /**
         * Значения из слайдера могут быть либо массивом из строк, либо строкой, приводим к универсальному формату т.е. к массиву чисел
         */
        if (typeof currentValue === 'string') {
          currentValue = [+currentValue]
        } else {
          currentValue = currentValue.map((el) => +el)
        }

        this.$el.noUiSlider.updateOptions({ range: newRange })
        /**
         * Убеждаемся что текущие value стоят в пределах обновленного промежутка
         */
        const value = currentValue.map((el) => Math.min(Math.max(newRange.min, el), newRange.max))
        /**
         * Если хоть одно значение value не стоит в пределах промежутка - обновляем его
         */
        if (currentValue.some((el, index) => el !== value[index])) {
          this.$emit('change', value)
          this.fromEvent = true
        }
      }
    }
  },
  methods: {
    update() {
      this.$emit('change', this.currentValue)
      /*
        нужно исключить обновления из родителя, которые начинаются из этого эвента,
        иначе скрипты попадают в бесконечный цикл обновления
      */
      this.fromEvent = true
    }
  }
}
</script>

<style lang="postcss">
/* Functional styling;
 * These styles are required for noUiSlider to function.
 * You don't need to change these rules to apply your design.
 */
.noUi--target,
.noUi-target * {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  touch-action: none;
  user-select: none;
  box-sizing: border-box;
}
.noUi-target {
  position: relative;
}
.noUi-base,
.noUi-connects {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
/* Wrapper for all connect elements.
 */
.noUi-connects {
  overflow: hidden;
  z-index: 0;
}
.noUi-connect,
.noUi-origin {
  will-change: transform;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  -webkit-transform-style: preserve-3d;
  transform-origin: 0 0;
  transform-style: flat;
}
.noUi-connect {
  height: 100%;
  width: 100%;
}
.noUi-origin {
  height: 10%;
  width: 10%;
}

/* Offset direction
 */
.noUi-txt-dir-rtl.noUi-horizontal .noUi-origin {
  left: 0;
  right: auto;
}

/* Give origins 0 height/width so they don't interfere with clicking the
 * connect elements.
 */
.noUi-vertical .noUi-origin {
  width: 0;
}
.noUi-horizontal .noUi-origin {
  height: 0;
}
.noUi-handle {
  backface-visibility: hidden;
  position: absolute;
}
.noUi-touch-area {
  height: 100%;
  width: 100%;
}
.noUi-state-tap .noUi-connect,
.noUi-state-tap .noUi-origin {
  transition: transform 0.3s;
}
.noUi-state-drag * {
  cursor: inherit !important;
}

/* Slider size and handle placement;
 */
.noUi-horizontal {
  height: 18px;
}
.noUi-horizontal .noUi-handle {
  width: 34px;
  height: 28px;
  right: -17px;
  top: -6px;
}
.noUi-vertical {
  width: 18px;
}
.noUi-vertical .noUi-handle {
  width: 28px;
  height: 34px;
  right: -6px;
  top: -17px;
}
.noUi-txt-dir-rtl.noUi-horizontal .noUi-handle {
  left: -17px;
  right: auto;
}

/* Styling;
 * Giving the connect element a border radius causes issues with using transform: scale
 */
.noUi-target {
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #d3d3d3;
  box-shadow: inset 0 1px 1px #f0f0f0, 0 3px 6px -5px #bbb;
}
.noUi-connects {
  border-radius: 3px;
}
.noUi-connect {
  background: #3fb8af;
}

/* Handles and cursors;
 */
.noUi-draggable {
  cursor: ew-resize;
}
.noUi-vertical .noUi-draggable {
  cursor: ns-resize;
}
.noUi-handle {
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: #fff;
  cursor: default;
  box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ebebeb, 0 3px 6px -3px #bbb;
}
.noUi-active {
  box-shadow: inset 0 0 1px #fff, inset 0 1px 7px #ddd, 0 3px 6px -3px #bbb;
}

/* Handle stripes;
 */
.noUi-handle:before,
.noUi-handle:after {
  content: '';
  display: block;
  position: absolute;
  height: 14px;
  width: 1px;
  background: #e8e7e6;
  left: 14px;
  top: 6px;
}
.noUi-handle:after {
  left: 17px;
}
.noUi-vertical .noUi-handle:before,
.noUi-vertical .noUi-handle:after {
  width: 14px;
  height: 1px;
  left: 6px;
  top: 14px;
}
.noUi-vertical .noUi-handle:after {
  top: 17px;
}

/* Disabled state;
 */

[disabled].noUi-connect {
  background: #b8b8b8;
}
[disabled].noUi-target,
[disabled].noUi-handle,
[disabled].noUi-handle {
  cursor: not-allowed;
}

/* Base;
 *
 */
.noUi-pips,
.noUi-pips * {
  box-sizing: border-box;
}
.noUi-pips {
  position: absolute;
  color: #999;
}

/* Values;
 *
 */
.noUi-value {
  position: absolute;
  white-space: nowrap;
  text-align: center;
}
.noUi-value-sub {
  color: #ccc;
  font-size: 10px;
}

/* Markings;
 *
 */
.noUi-marker {
  position: absolute;
  background: #ccc;
}
.noUi-marker-sub {
  background: #aaa;
}
.noUi-marker-large {
  background: #aaa;
}

/* Horizontal layout;
 *
 */
.noUi-pips-horizontal {
  padding: 10px 0;
  height: 80px;
  top: 100%;
  left: 0;
  width: 100%;
}
.noUi-value-horizontal {
  transform: translate(-50%, 50%);

  .noUi-rtl & {
    transform: translate(50%, 50%);
  }
}

.noUi-marker-horizontal.noUi-marker {
  margin-left: -1px;
  width: 2px;
  height: 5px;
}
.noUi-marker-horizontal.noUi-marker-sub {
  height: 10px;
}
.noUi-marker-horizontal.noUi-marker-large {
  height: 15px;
}

/* Vertical layout;
 *
 */
.noUi-pips-vertical {
  padding: 0 10px;
  height: 100%;
  top: 0;
  left: 100%;
}
.noUi-value-vertical {
  transform: translate(0, -50%);
  padding-left: 25px;

  .noUi-rtl & {
    transform: translate(0, 50%);
  }
}

.noUi-marker-vertical.noUi-marker {
  width: 5px;
  height: 2px;
  margin-top: -1px;
}
.noUi-marker-vertical.noUi-marker-sub {
  width: 10px;
}
.noUi-marker-vertical.noUi-marker-large {
  width: 15px;
}

.noUi-tooltip {
  display: block;
  position: absolute;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: #fff;
  color: #000;
  padding: 5px;
  text-align: center;
  white-space: nowrap;
}
.noUi-horizontal .noUi-tooltip {
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 120%;
}
.noUi-vertical .noUi-tooltip {
  transform: translate(0, -50%);
  top: 50%;
  right: 120%;
}
.noUi-horizontal .noUi-origin > .noUi-tooltip {
  transform: translate(50%, 0);
  left: auto;
  bottom: 10px;
}
.noUi-vertical .noUi-origin > .noUi-tooltip {
  transform: translate(0, -18px);
  top: auto;
  right: 28px;
}

/* Functional styling;
 * These styles are required for noUiSlider to function.
 * You don't need to change these rules to apply your design.
 */

.red-target {
  background: #e5e5e5;
  border-radius: 10px;
}
.red-connects {
  border-radius: 3px;
}
.red-connect {
  background: #f30c00;
}
.red-handle {
  border-radius: 50%;
  background: #f30c00;
  cursor: pointer;
  outline: none;
}
.red-horizontal {
  height: 1px;
}
.red-horizontal .red-handle {
  width: 9px;
  height: 9px;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
}
.range-input_disabled {
  .red-handle {
    background: #cbcbcb;
  }
  .red-connect {
    background: #cbcbcb;
  }
}
.range-input_touch {
  .red-horizontal {
    position: absolute;
    bottom: 12px;
    left: 20px;
    width: calc(100% - 30px);
    height: 5px;
  }
  .red-horizontal .red-handle {
    width: 17px;
    height: 17px;
    border: 1px solid #ddd;
    background: #fff;
    right: -8px;
    top: -7px;
    transform: translateY(0);
  }
  .red-target {
    background: #f4f4f4;
  }
}

.range-input_small-touch {
  .range-input__note {
    padding-top: 11px;
    height: 55px;
    align-items: flex-start;
    border-bottom: 1px solid #e5e5e5;
    border-radius: 4px;
  }
  .range-input__note-input {
    max-width: 50px;
  }
  .red-horizontal {
    position: absolute;
    bottom: 12px;
    left: 16px;
    width: calc(100% - 30px);
    height: 5px;
  }
  .red-horizontal .red-handle {
    width: 17px;
    height: 17px;
    border: 1px solid #ddd;
    background: #fff;
    right: -8px;
    top: -7px;
    transform: translateY(0);
  }
  .red-target {
    background: #f4f4f4;
  }
}

.red--target,
.red-target * {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  touch-action: none;
  user-select: none;
  box-sizing: border-box;
}
.red-target {
  position: relative;
}
.red-base,
.red-connects {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
/* Wrapper for all connect elements.
 */
.red-connects {
  overflow: hidden;
  z-index: 0;
}
.red-connect,
.red-origin {
  will-change: transform;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  -webkit-transform-style: preserve-3d;
  transform-origin: 0 0;
  transform-style: flat;
}
.red-connect {
  height: 100%;
  width: 100%;
}
.red-origin {
  height: 10%;
  width: 10%;
}

/* Offset direction
 */
.red-txt-dir-rtl.red-horizontal .red-origin {
  left: 0;
  right: auto;
}

/* Give origins 0 height/width so they don't interfere with clicking the
 * connect elements.
 */
.red-vertical .red-origin {
  width: 0;
}
.red-horizontal .red-origin {
  height: 0;
}
.red-handle {
  backface-visibility: hidden;
  position: absolute;
}
.red-touch-area {
  height: 100%;
  width: 100%;
}
.red-state-tap .red-connect,
.red-state-tap .red-origin {
  transition: transform 0.3s;
}
.red-state-drag * {
  cursor: inherit !important;
}

/* Slider size and handle placement;
 */
.red-vertical {
  width: 18px;
}
.red-vertical .red-handle {
  width: 9px;
  height: 9px;
  right: -0px;
  top: -7px;
}
.red-txt-dir-rtl.red-horizontal .red-handle {
  left: -17px;
  right: auto;
}

/* Handles and cursors;
 */
.red-draggable {
  cursor: ew-resize;
}
.red-vertical .red-draggable {
  cursor: ns-resize;
}

.red-handle:after {
  left: 17px;
}
.red-vertical .red-handle:before,
.red-vertical .red-handle:after {
  width: 14px;
  height: 1px;
  left: 6px;
  top: 14px;
}
.red-vertical .red-handle:after {
  top: 17px;
}

/* Disabled state;
 */

[disabled].red-target,
[disabled].red-handle,
[disabled].red-handle {
  cursor: not-allowed;
}

/* Base;
 *
 */
.red-pips,
.red-pips * {
  box-sizing: border-box;
}
.red-pips {
  position: absolute;
  color: #999;
}

/* Values;
 *
 */
.red-value {
  position: absolute;
  white-space: nowrap;
  text-align: center;
}
.red-value-sub {
  color: #ccc;
  font-size: 10px;
}

/* Markings;
 *
 */
.red-marker {
  position: absolute;
  background: #ccc;
}
.red-marker-sub {
  background: #aaa;
}
.red-marker-large {
  background: #aaa;
}

/* Horizontal layout;
 *
 */
.red-pips-horizontal {
  padding: 10px 0;
  height: 80px;
  top: 100%;
  left: 0;
  width: 100%;
}
.red-value-horizontal {
  transform: translate(-50%, 50%);

  .red-rtl & {
    transform: translate(50%, 50%);
  }
}

.red-marker-horizontal.red-marker {
  margin-left: -1px;
  width: 2px;
  height: 5px;
}
.red-marker-horizontal.red-marker-sub {
  height: 10px;
}
.red-marker-horizontal.red-marker-large {
  height: 15px;
}

/* Vertical layout;
 *
 */
.red-pips-vertical {
  padding: 0 10px;
  height: 100%;
  top: 0;
  left: 100%;
}
.red-value-vertical {
  transform: translate(0, -50%);
  padding-left: 25px;

  .red-rtl & {
    transform: translate(0, 50%);
  }
}

.red-marker-vertical.red-marker {
  width: 5px;
  height: 2px;
  margin-top: -1px;
}
.red-marker-vertical.red-marker-sub {
  width: 10px;
}
.red-marker-vertical.red-marker-large {
  width: 15px;
}

.red-tooltip {
  display: block;
  position: absolute;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background: #fff;
  color: #000;
  padding: 5px;
  text-align: center;
  white-space: nowrap;
}
.red-horizontal .red-tooltip {
  transform: translate(-50%, 0);
  left: 50%;
  bottom: 120%;
}
.red-vertical .red-tooltip {
  transform: translate(0, -50%);
  top: 50%;
  right: 120%;
}
.red-horizontal .red-origin > .red-tooltip {
  transform: translate(50%, 0);
  left: auto;
  bottom: 10px;
}
.red-vertical .red-origin > .red-tooltip {
  transform: translate(0, -18px);
  top: auto;
  right: 28px;
}

.custom-slider {
  position: relative;
}
</style>
