import Checkbox from '@src/components/Checkbox/index.vue'
import ListSearch from '@src/components/ListSearch/index.vue'

export default {
  name: 'TreeMultipleList',
  components: {
    Checkbox,
    ListSearch
  },
  props: {
    /**
     * Массив на основе данных которого будет построен селект. Пример структуры можно посмотреть в примерах
     */
    list: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Выбранные элементы в виде массива, состоящего из объекта со значениями value, name, children, disabled
     */
    value: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Активировать поиск
     */
    search: {
      type: Boolean,
      default: false
    },
    /**
     * Пустой текст для поиска
     */
    emptySearchText: {
      type: String,
      default: 'Элементы не найдены'
    },
    /**
     * Активировать ли дочерние элементы при нажатии на родительский элемент
     */
    isSelectedChildren: {
      type: Boolean,
      default: true
    },
    /**
     * Сбрасывать ли путь. Например при закрытия селекта
     */
    resetPathOnCloseSelect: {
      type: Boolean,
      default: false
    },
    /**
     * Адаптер для поиска, этот пропс прокидывается напрямую в ListSearch
     */
    searchAdapter: Function,
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
      path: [
        {
          list: this.list
        }
      ],
      val: this.value || [],
      searchQuery: null,
      isActiveLoading: false,
      searchData: []
    }
  },
  computed: {
    currentParent() {
      return this.path[this.path.length - 1]
    }
  },
  watch: {
    resetPathOnCloseSelect(state) {
      if (state)
        this.path = [
          {
            list: this.list
          }
        ]
    },
    list() {
      this.path = [
        {
          list: this.list
        }
      ]
    },
    value(arr) {
      this.val = arr
    }
  },
  methods: {
    onSearchInput(val) {
      this.searchQuery = val
    },
    onSearchFocus() {
      if (this.searchData.length === 0 && !this.searchAdapter) {
        this.searchData = this.flattenListData(this.list)
      }
    },
    flattenListData(data) {
      const list = []
      const aggregateElement = (el) => {
        if (this.hasChild(el)) {
          el.children.forEach(aggregateElement)
        }

        list.push(el)
      }
      data.forEach(aggregateElement)

      return list
    },
    async onItemClick({ item, event, selectNestedInsteadNavigateInto = false } = {}) {
      const isCheckbox = event.target.closest('.checkbox')
      const value = item[this.namePropValue]
      if (isCheckbox) return

      if (this.hasChild(item) && !selectNestedInsteadNavigateInto) {
        this.path.push({
          name: item.name,
          [this.namePropValue]: value,
          [this.namePropDisabled]: item[this.namePropDisabled],
          list: item.children
        })
      } else if (!item[this.namePropDisabled]) {
        const state = this.getStateByValue({ value })
        this.onCheckboxToggle({ ...item, value, state: !state })
      }
    },
    onCheckboxToggle({ name, value, children, state } = {}) {
      if (state) {
        this.addValue({
          name,
          value
        })
      } else {
        this.removeValue({
          value
        })
      }

      if (this.hasChild({ children })) {
        this.toggleChildElements({ el: { name, value, children }, state })
      }

      this.checkParentElement({
        /**
         * если мы переключаем активный в данный момент список, то проверять его не нужно, поэтому проверяем сразу стоящий перед ним
         */
        level: this.path.length - (this.path[this.path.length - 1][this.namePropValue] === value ? 2 : 1)
      })
    },
    checkParentElement({ level } = {}) {
      if (level > 0 && this.isSelectedChildren) {
        const isEveryActive = this.path[level].list.every((el) => {
          const isActive = this.val.some((item) => item[this.namePropValue] === el[this.namePropValue])
          return isActive
        })
        if (isEveryActive) {
          this.addValue({
            name: this.path[level].name,
            value: this.path[level][this.namePropValue]
          })
          this.checkParentElement({ level: level - 1 })
        } else {
          while (level > 0) {
            this.removeValue({
              value: this.path[level][this.namePropValue]
            })
            level -= 1
          }
        }
      }
    },
    toggleChildElements({ el, state = false } = {}) {
      const toggleChild = (el) => {
        // не изменяем состояние дочернего чекбокса, у которого свойство disabled равно true
        if (el[this.namePropDisabled]) {
          return
        } else if (this.hasChild(el)) {
          el.children.forEach(toggleChild)
        }

        if (state) {
          this.addValue({ value: el[this.namePropValue], name: el.name })
        } else {
          this.removeValue({ value: el[this.namePropValue] })
        }
      }
      if (this.isSelectedChildren) {
        el.children.forEach(toggleChild)
      }
    },
    addValue({ value, name } = {}) {
      const alreadyActive = this.val.some((el) => el[this.namePropValue] === value)
      if (!alreadyActive) {
        this.val.push({ [this.namePropValue]: value, name })
        this.$emit('change', this.val)
      }
    },
    removeValue({ value } = {}) {
      const index = this.val.findIndex((el) => el[this.namePropValue] === value)
      if (index !== -1) {
        this.val.splice(index, 1)
        this.$emit('change', this.val)
      }
    },
    getStateByValue({ value } = {}) {
      return this.val.some((el) => el[this.namePropValue] === value)
    },
    hasChild({ children }) {
      return Array.isArray(children) && children.length
    },
    backToPrevious() {
      if (this.path.length > 1) {
        this.path.pop()
      }
    }
  }
}
