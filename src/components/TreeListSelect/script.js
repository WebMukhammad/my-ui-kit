import ListSearch from '@src/components/ListSearch/index.vue'

export default {
  name: 'TreeListSelect',
  components: {
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
      type: Object,
      default() {
        return {}
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
     * Сбрасывать ли путь при закрытия селекта
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
     * Нужно ли чистить строку поиска при выборе пункта в результатах поиска
     */
    isClearQuery: {
      type: Boolean,
      default: false
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
    }
  },
  data() {
    return {
      path: [
        {
          list: this.list
        }
      ],
      val: this.value,
      searchQuery: null,
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
    onItemClick(item) {
      if (this.hasChild(item)) {
        this.path.push({
          name: item.name,
          [this.namePropValue]: item[this.namePropValue],
          list: item.children
        })
      } else {
        this.select({
          [this.namePropValue]: item[this.namePropValue],
          name: item.name
        })
      }
    },
    isSelected({ value, children, exludeNested = true }) {
      const isSelectedValue = this.val?.[this.namePropValue] === value
      if (exludeNested) {
        return isSelectedValue && !this.hasChild({ children })
      } else {
        return isSelectedValue
      }
    },
    hasChild({ children }) {
      return Array.isArray(children) && children.length
    },
    backToPrevious() {
      if (this.path.length > 1) {
        this.path.pop()
      }
    },
    select({ value, name } = {}) {
      if (value === this.val?.[this.namePropValue]) return
      this.val = { value, name }
      this.$emit('change', { value, name })
      if (this.isClearQuery) {
        this.searchQuery = null
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
    }
  }
}
