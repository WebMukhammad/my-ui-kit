<template>
  <div
    :class="[
      'select',
      selectedClass,
      {
        select_active: isActive,
        select_error: error,
        select_disabled: disabled,
        select_native: isTouchDevice(),
        select_loading: loading
      }
    ]"
    v-shortkey="{ up: ['arrowup'], down: ['arrowdown'], enter: ['enter'], esc: ['esc'] }"
    @shortkey="onKeyClick"
  >
    <select class="select__default" ref="defaultSelect" @change="onDefaultSelectChange" :multiple="multiple">
      <option :disabled="!selected" :selected="optionDefaultSelected" value="">{{ placeholderText }}</option>
      <option v-for="el in list" :key="el[namePropValue]" :value="el[namePropValue]" :selected="optionSelected(el[namePropValue])">
        {{ el.name }}
      </option>
    </select>
    <div class="select__first-row" @click="onSelectClick" ref="select">
      <template v-if="multiple">
        <template v-if="multipleSelected && multipleSelected.length">
          <div class="select__selected-checked">
            <div v-if="multipleView === 'count'" class="select__selected-checked-item">
              <div class="select__selected-checked-text">{{ declOfNumItems(multipleSelected.length) }}</div>
            </div>
            <template v-else>
              <div class="select__selected-checked-item" v-for="el in multipleSelected" :key="el">
                <div class="select__selected-checked-text">{{ getListElByName(el) }}</div>
                <div class="icon-close icon-close_brown select__selected-checked-icon" @click="deleteElementFromMultipleList(el)"></div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="select__placeholder">{{ placeholder }}</div>
        </template>
      </template>
      <template v-else>
        <template v-if="name">
          <div class="select__selected">{{ name }}</div>
        </template>
        <template>
          <div class="select__placeholder">{{ placeholder }}</div>
        </template>
      </template>
    </div>

    <div class="select__popup" ref="list">
      <div class="select__wrapper">
        <div class="select__scroll-wrapper" :style="`max-height: ${maxHeight}px;`" ref="scrollWrapper">
          <div class="select__row">
            <template v-if="search">
              <label class="select__label">
                <input type="text" class="select__input" placeholder="Поиcк по списку" v-model="searchQuery" ref="search" />
              </label>
            </template>
            <div v-if="filterList.length">
              <div class="select__list" @mousemove="onListMouseMove($event, 'checkbox-list__el')" v-if="multiple">
                <CheckboxList
                  class="checkbox-list_inside-select"
                  :list="filterList"
                  :modelValue="multipleSelected"
                  :namePropValue="namePropValue"
                  @change="onCheckboxListChange"
                  name="city"
                />
              </div>
              <div class="select__list" @mousemove="onListMouseMove($event, 'select__el')" v-else>
                <div
                  class="select__el"
                  v-for="el in filterList"
                  :key="el[namePropValue]"
                  :value="el[namePropValue]"
                  :class="[{ select__el_selected: el[namePropValue] === selected, select__el_hover: el.hover }]"
                  @click="onListElClick($event, 'select__el')"
                >
                  {{ el.name }}
                </div>
              </div>
            </div>
            <div class="select__empty-search p" v-else>{{ emptySearch }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<docs>
  Стандартный вид селекта:
  ```[import](./example/example.vue)
  ```

  Cелект с поиском:
  ```[import](./example/searchSelect.vue)
  ```

  Селект с ошибкой:
  ```
  <Select
    :data="[
      { name: 'Махачкала', value: '1' },
      { name: 'Ижевск', value: '2' },
      { name: 'Москва', value: '3' },
      { name: 'Питер', value: '4' },
      { name: 'Казань', value: '5' },
      { name: 'Уфа', value: '6' },
    ]"
    error
  />
  ```

  Задизейбленный селект:
  ```
  <Select disabled/>
  ```

  Селект с множественным выбором:
  ```[import](./example/multiplySelect.vue)
  ```
</docs>

<script>
import CheckboxList from '@src/components/CheckboxList/index.vue'
import Fuse from 'fuse.js'
import { createPopper } from '@popperjs/core'
import isTouchDevice from 'is-touch-device'
import declOfNum from '@src/helper/declOfNum.js'

/**
 * Кастомный селект на десктопе, нативный на тач-устройствах, он сам определяет каким ему быть. Поддерживает кучу фич:
 * навигацию по открытому селекту через стрелки, поиск внутри селекта (с поддержкой опечаток), выбор нескольких пунктов внутри селекта
 */
export default {
  name: 'Select',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    CheckboxList
  },
  props: {
    value: {
      type: [String, Number, Array]
    },
    /**
     * Активировать поиск
     */
    search: {
      type: Boolean,
      default: false
    },
    /**
     * Массив на основе данных которого будет построен селект, внутри объекты с name и value
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Placeholder для селекта
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * Задизейблить
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Максимальная высота drop down
     */
    maxHeight: {
      type: String,
      default: '290'
    },
    /**
     * Селект с ошибкой?
     */
    error: {
      type: Boolean,
      default: false
    },
    /**
     * Селект с возможностью выбрать несколько значений
     * @values checked
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Показывать ли иконку загрузки
     * @values true, false
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Открывать ли селект после загрузки
     * @values true, false
     */
    loadingOpenSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Текст, когда не найдены элементы во время поиска
     */
    emptySearch: {
      type: String,
      default: 'Элементы не найдены'
    },
    /**
     * Пустой элемент селекта
     */
    emptyOption: {
      type: String,
      default: 'Не выбрано'
    },
    /**
     * Название свойства для значения элемента
     */
    namePropValue: {
      type: String,
      default: 'value'
    },
    /**
     * Вид выбранных значений у селекта multiple
     */
    multipleView: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'count'].some((el) => el === value)
      }
    },
    /**
     * Показывать ли в списке пустой элемент селекта
     */
    visibleEmptyOption: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isActive: false,
      selected: null,
      searchQuery: null,
      multipleSelected: [],
      currentHoverIndex: null,
      list: this.data,
      lastAction: null,
      popperInstance: null,
      loadingOpenSelectVal: this.loadingOpenSelect
    }
  },
  created() {
    if (this.multiple) {
      this.multipleSelected = this.value
    } else {
      this.val = this.value
    }
    if (this.search) {
      this.fuse = new Fuse(this.list, {
        includeScore: true,
        keys: ['name'],
        threshold: 0.4
      })
    }
  },
  destroyed() {
    window.removeEventListener('mousemove', this.onWindowMouseMove)
    window.removeEventListener('click', this.outsideClickHandler)
    this.destroyPopper()
  },
  watch: {
    value(val) {
      if (this.multiple) {
        this.multipleSelected = val
      } else {
        this.val = val
      }
    },
    data(data) {
      this.list = data
    },
    loading(state) {
      // если у нас происходит загрузка, то мы закрываем селект
      if (state) {
        this.closeSelect()
      } else if (this.loadingOpenSelectVal) {
        // а если же произошла загрузка и loadingOpenSelect равен true, то открываем селект
        this.openSelect()
      }
    }
  },
  computed: {
    selectedClass() {
      let state = false
      if ((Array.isArray(this.selected) && this.selected.length) || (!Array.isArray(this.selected) && this.selected)) {
        state = true
      }
      return state ? 'select_selected' : 'select_placeholder'
    },
    name() {
      const el = this.list.find((el) => el[this.namePropValue] === this.val)
      return el ? el.name : null
    },
    multipleListSelected() {
      return Array.isArray(this.list) && this.list.length
        ? this.list.filter((el) => this.multipleSelected.includes(el[this.namePropValue]))
        : []
    },
    elSelected() {
      return Array.isArray(this.list) && this.list.length ? this.list?.filter((el) => el[this.namePropValue] === this.selected)?.[0] : null
    },
    val: {
      get() {
        return this.selected
      },
      set(v) {
        this.selected = v || null
      }
    },
    filterList() {
      if (this.searchQuery) {
        this.fuse.setCollection(this.list)
        const result = this.fuse.search(this.searchQuery)
        return result.map((el) => el.item)
      } else {
        return this.multiple || !this.visibleEmptyOption
          ? this.list
          : [{ name: this.emptyOption, [this.namePropValue]: null }, ...this.list]
      }
    },
    placeholderText() {
      return this.selected && !this.multiple ? this.emptyOption : this.placeholder
    },
    optionDefaultSelected() {
      return this.multiple ? this.multipleSelected.length === 0 : !this.selected
    }
  },
  methods: {
    onSelectClick(e) {
      this.loadingOpenSelectVal = true
      if (this.disabled || this.loading || e.target.closest('.select__selected-checked-icon')) return
      this.isActive ? this.closeSelect() : this.openSelect()
    },
    onCheckboxListChange() {
      /**
       * Срабатывает при изменении значения селекта
       * @property { value } текущее значение селекта, может быть массивом если возможен выбор нескольких свойств
       */
      this.$emit('change', this.multipleSelected, this.multipleListSelected)
    },
    onListElClick(e, className) {
      const target = e.target.closest(`.${className}`)
      if (target) {
        const index = Array.from(target.parentNode.children).indexOf(target)
        this.select(index)
      }
    },
    onListMouseMove(e, elClass) {
      const el = e.target.closest(`.${elClass}`)
      if (el) {
        this.lastAction = 'mouse'
        const index = Array.from(el.parentNode.children).indexOf(el)
        this.changeHover(index)
      }
    },
    onWindowMouseMove({ target }) {
      const notInsideList = !target.closest('.select__list')
      if (notInsideList && this.lastAction === 'mouse') this.resetHover()
    },
    openSelect() {
      this.$emit('open')
      this.isActive = true
      if (this.search) this.$nextTick(() => this.$refs.search.focus())
      this.initPopper()
      window.addEventListener('mousemove', this.onWindowMouseMove)
      window.addEventListener('click', this.outsideClickHandler)
    },
    closeSelect() {
      this.$emit('close')
      this.isActive = false
      this.resetHover()
      this.destroyPopper()
      window.removeEventListener('mousemove', this.onWindowMouseMove)
      window.removeEventListener('click', this.outsideClickHandler)
      if (this.$refs.scrollWrapper) this.$refs.scrollWrapper.scrollTop = 0
    },
    initPopper() {
      if (!this.popperInstance) {
        this.popperInstance = createPopper(this.$refs.select, this.$refs.list, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -36]
              }
            },
            {
              name: 'flip',
              options: {
                allowedAutoPlacements: ['top', 'bottom']
              }
            }
          ]
        })
      }
    },
    destroyPopper() {
      if (this.popperInstance) {
        this.popperInstance.destroy()
        this.popperInstance = null
      }
    },
    outsideClickHandler({ target }) {
      const select = target.closest('.select')
      const notResetIcon = !target.closest('.select__selected-checked-icon')
      const notInsideCurrentSelect = select !== this.$el
      if (notInsideCurrentSelect && notResetIcon) {
        this.closeSelect()
      }
    },
    changeHover(index) {
      if (this.previousHoverEl) this.$set(this.previousHoverEl, 'hover', false)
      this.$set(this.filterList[index], 'hover', true)
      this.previousHoverEl = this.filterList[index]
      this.currentHoverIndex = index
    },
    resetHover() {
      if (this.previousHoverEl) {
        this.$set(this.previousHoverEl, 'hover', false)
        this.previousHoverEl = null
        this.currentHoverIndex = null
      }
    },
    resetMultipleSelect() {
      this.multipleSelected = []
      this.$emit('change', this.multipleSelected, this.multipleListSelected)
    },
    select(index) {
      const val = this.filterList[index][this.namePropValue]
      if (this.multiple) {
        const alreadySelected = this.multipleSelected.some((el) => el === val)
        if (alreadySelected) {
          this.deleteElementFromMultipleList(val)
        } else {
          this.multipleSelected.push(val)
        }
        this.$emit('change', this.multipleSelected, this.multipleListSelected)
        this.$forceUpdate()
      } else {
        if (val === this.selected) return
        this.val = val
        this.$emit('change', this.selected, this.elSelected)
        this.closeSelect()
      }
    },
    onDefaultSelectChange(e) {
      if (this.multiple) {
        this.multipleSelected = this.getDefaultSelectValue(this.$refs.defaultSelect)
        this.onCheckboxListChange()
      } else {
        this.val = this.getDefaultSelectValue(this.$refs.defaultSelect)
        this.$emit('change', this.selected, this.elSelected)
      }
    },
    getDefaultSelectValue(select) {
      if (this.multiple) {
        let arr = Array.from(select.selectedOptions)
        arr = arr.map((el) => el.value)
        return arr
      } else {
        return select[this.namePropValue]
      }
    },
    onKeyClick(event) {
      if (!this.isActive) return
      this.lastAction = 'key'
      switch (event.srcKey) {
        case 'up': {
          let index
          if (this.currentHoverIndex === null) {
            index = 0
          } else {
            index = this.currentHoverIndex <= 0 ? 0 : this.currentHoverIndex - 1
          }
          this.changeHover(index)
          this.$nextTick(this.up)
          break
        }
        case 'down': {
          let index
          if (this.currentHoverIndex === null) {
            index = 0
          } else {
            index = this.currentHoverIndex === this.filterList.length - 1 ? this.currentHoverIndex : this.currentHoverIndex + 1
          }
          this.changeHover(index)
          this.$nextTick(this.down)
          break
        }
        case 'enter': {
          this.select(this.currentHoverIndex)
          break
        }
        case 'esc': {
          this.closeSelect()
          break
        }
      }
    },
    up() {
      const $hoverEl = this.$refs.list.querySelector('.select__el_hover')
      if ($hoverEl) {
        const $wrapper = this.$refs.list.querySelector('.select__scroll-wrapper')
        const notVisible = $wrapper.scrollTop >= $hoverEl.offsetTop
        if (notVisible) $wrapper.scrollTop = $hoverEl.offsetTop
      }
    },
    down() {
      const $hoverEl = this.$refs.list.querySelector('.select__el_hover')
      if ($hoverEl) {
        const $wrapper = this.$refs.list.querySelector('.select__scroll-wrapper')
        const notVisible = $wrapper.scrollTop + $wrapper.offsetHeight <= $hoverEl.offsetTop + $hoverEl.offsetHeight
        if (notVisible) $wrapper.scrollTop = $wrapper.scrollTop + $hoverEl.offsetHeight
      }
    },
    isTouchDevice() {
      return isTouchDevice()
    },
    getListElByName(value) {
      return this.list.find((el) => el[this.namePropValue] === value)?.name
    },
    deleteElementFromMultipleList(value) {
      this.multipleSelected.splice(this.multipleSelected.indexOf(value), 1)
      this.$emit('change', this.multipleSelected, this.multipleListSelected)
    },
    declOfNumItems(count) {
      return `${declOfNum(count, ['Выбран', 'Выбрано', 'Выбрано'])} ${count} ${declOfNum(count, ['пункт', 'пункта', 'пунктов'])}`
    },
    optionSelected(val) {
      return this.multiple ? this.multipleSelected.includes(val) : val === this.selected
    }
  }
}
</script>

<style src="./style.css"></style>
