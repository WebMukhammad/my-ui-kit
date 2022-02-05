import { createPopper } from '@popperjs/core'
import Checkbox from '@src/components/Checkbox/index.vue'
import TreeListSelect from '@src/components/TreeListSelect/index.vue'
import TreeMultipleList from '@src/components/TreeMultipleList/index.vue'
import declOfNum from '@src/helper/declOfNum.js'

export default {
  name: 'TreeSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    Checkbox,
    TreeListSelect,
    TreeMultipleList
  },
  props: {
    /**
     * Выбранные элементы в виде массива, состоящего из объекта со значениями value, name, children, disabled.
     * Этот пропс прокидывается напрямую в TreeListSelect/TreeMultipleSelect
     */
    value: {
      type: [Array, Object]
    },
    /**
     * Активировать поиск
     */
    search: {
      type: Boolean,
      default: false
    },
    /**
     * Массив на основе данных которого будет построен селект. Этот пропс прокидывается напрямую в TreeListSelect/TreeMultipleSelect
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
      default: 'Выберите элемент'
    },
    /**
     * Задизейблить
     */
    disabled: {
      type: Boolean,
      default: false
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
     * Активировать ли дочерние элементы при нажатии на родительский элемент
     */
    isSelectedChildren: {
      type: Boolean,
      default: true
    },
    /**
     * Пустой текст для поиска
     */
    emptySearchText: {
      type: String,
      default: 'Элементы не найдены'
    },
    /**
     * Адаптер для поиска, этот пропс прокидывается напрямую в ListSearch
     */
    searchAdapter: Function,
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
     * Подсказка для чекбокса
     */
    title: {
      type: String,
      default: null
    },
    /**
     * Подсказка для чекбокса при задизейбленном состоянии
     */
    disabledCheckboxTitle: {
      type: String,
      default: null
    },
    /**
     * Фиксировать ли строку поиска в верхней части
     */
    searchStickOnScroll: {
      type: Boolean,
      default: false
    },
    /**
     * Максимальная высота drop down
     */
    openSelectHeight: {
      type: String,
      default: '290px'
    },
    /**
     * Название свойства для значения элемента
     */
    namePropValue: {
      type: String,
      default: 'value'
    },
    /**
     * Название свойства для disable элемента
     */
    namePropDisabled: {
      type: String,
      default: 'disabled'
    }
  },
  data() {
    return {
      val: this.value,
      isActive: false,
      initialized: false,
      loadingOpenSelectVal: this.loadingOpenSelect
    }
  },
  watch: {
    value(val) {
      this.val = val
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
  destroyed() {
    window.removeEventListener('click', this.outsideClickHandler)
    this.destroyPopper()
  },
  computed: {
    somethingSelected() {
      return this.multiple ? this.val?.length > 0 : this.val
    },
    selectedText() {
      return declOfNum(this.val.length, [
        `Выбран ${this.val.length} элемент`,
        `Выбрано ${this.val.length} элемента`,
        `Выбрано ${this.val.length} элементов`
      ])
    }
  },
  methods: {
    onSelectClick(e) {
      this.loadingOpenSelectVal = true
      if (this.disabled || this.loading || e.target.closest('.tree-select__selected-checked-icon')) return
      this.isActive ? this.closeSelect() : this.openSelect()
    },
    openSelect() {
      this.$emit('open')
      this.initPopper()
      this.$refs.scrollWrapper.scrollTop = 0
      this.isActive = true
      window.addEventListener('click', this.outsideClickHandler)
    },
    closeSelect() {
      this.$emit('close')
      this.isActive = false
      this.destroyPopper()
      window.removeEventListener('click', this.outsideClickHandler)
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
      const select = target.closest('.tree-select')
      const parentIsNotNull = target?.parentNode?.parentNode // null может быть у только что удаленного элемента
      const notResetIcon = !target.closest('.tree-select__selected-checked-icon')
      const notInsideCurrentSelect = select !== this.$el
      if (parentIsNotNull && notInsideCurrentSelect && notResetIcon) {
        this.closeSelect()
      }
    },
    isArray(el) {
      return Array.isArray(el) && el.length
    },
    resetMultipleSelect() {
      this.val = []
      this.$emit('change', this.val)
    },
    onTreeListChange(data) {
      this.val = data
      this.$emit('change', this.val)
      this.closeSelect()
    },
    onMultipleTreeListChange(data) {
      this.val = data
      this.$emit('change', this.val)
    }
  }
}
