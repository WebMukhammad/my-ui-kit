import Fuse from 'fuse.js'
import merge from 'lodash.merge'

export default {
  name: 'ListSearch',
  props: {
    /**
     * Массив объектов по которым будет производиться поиск, пример структуры можно посмотреть в примерах
     */
    list: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * Пустой текст для поиска
     */
    emptySearchText: {
      type: String,
      default: 'Элементы не найдены'
    },
    /**
     * Нужно ли чистить строку поиска при выборе пункта в результатах поиска
     */
    isClearQuery: {
      type: Boolean,
      default: false
    },
    /**
     * Вызывается при поиске, в качестве параметров передается значение инпута, внутри функции нужно вернуть промис
     */
    searchAdapter: Function,
    /**
     * Конфиг с параметрами для поиска, прокидывается напрямую во Fuse
     */
    fuseOpts: {
      type: Object,
      default() {
        return {
          includeScore: true,
          keys: ['name'],
          threshold: 0.4
        }
      }
    },
    /**
     * Отступы для обертки инпута, прокидываются напрямую в style
     */
    inputPadding: {
      type: String,
      default: null
    },
    /**
     * Фиксировать ли строку поиска в верхней части
     */
    searchStickOnScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchQuery: null,
      isActiveLoading: false,
      searchResult: []
    }
  },
  watch: {
    list(val) {
      if (!this.searchAdapter) {
        this.fuse.setCollection(val)
      }
    }
  },
  created() {
    if (!this.searchAdapter) {
      const opts = merge(
        {
          includeScore: true,
          keys: ['name'],
          threshold: 0.4
        },
        this.fuseOpts
      )

      this.fuse = new Fuse(this.list, opts)
    }
  },
  methods: {
    onItemClick(item) {
      this.$emit('click', item)
      if (this.isClearQuery) {
        this.searchQuery = null
      }
    },
    async onInput({ target } = {}) {
      this.$emit('input', target.value)
      if (this.searchQuery) {
        if (this.searchAdapter) {
          this.isActiveLoading = true
          this.searchResult = await this.searchAdapter(this.searchQuery)
          this.isActiveLoading = false
        } else {
          const result = this.fuse.search(this.searchQuery)
          this.searchResult = result.map((el) => el.item)
        }
      } else {
        this.searchResult = []
        this.isActiveLoading = false
      }
    },
    onFocus({ target } = {}) {
      this.$emit('focus', target.value)
    }
  }
}
