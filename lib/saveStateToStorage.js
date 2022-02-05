const debounce = require('lodash.debounce')

/**
 * @param {Array.Object} option - Массив объектов с параметрами формы
 * @param {string} option[].name - Имя формы данные которой надо сохранить. Должно быть уникальным
 * @param {string} option[].fields - Название свойства где хранятся данные этой формы
 * @param {Array.string} [option[].include] - Сохранятся только переданные поля
 * @param {Array.string} [option[].exclude] - Эти поля сохранены не будут. Даже если они указаны в include
 * @returns {Object} Объект миксина который следит за формой и сохраняет её в localStorage
 */
export default function saveStateToStorage(formsArray) {
  if (!Array.isArray(formsArray)) {
    throw new TypeError('saveStateToStorage: Аргумент функции должен быть массивом')
  }

  formsArray.forEach((form) => {
    if (typeof form !== 'object' && !Array.isArray(form) && form !== null)
      throw new TypeError('saveStateToStorage: Все элементы массива должны быть объектами')
    if (!form.fields || !form.name) throw new TypeError('saveStateToStorage: fields и name обязательные поля для объекта')
    if (typeof form.fields !== 'string' || typeof form.name !== 'string')
      throw new TypeError('saveStateToStorage: fields и name должны быть строками')
    ;['include', 'exclude'].forEach((v) => {
      if (typeof form[v] !== 'undefined') {
        if (Array.isArray(form[v])) {
          form[v].forEach((i) => {
            if (typeof i !== 'string') throw new TypeError(`saveStateToStorage: ${v} должен содержать только строки`)
          })
        } else {
          throw new TypeError(`saveStateToStorage: ${v} должен быть массивом`)
        }
      }
    })
  })

  return {
    mounted() {
      formsArray.forEach((form) => {
        this.$_formStateSave_set(form)
        const debouncedHandleSaveForm = debounce(this.$_formStateSave_handleSaveForm, 500)
        this.$watch(
          form.fields,
          () => {
            debouncedHandleSaveForm(form)
          },
          { deep: true }
        )
      })
    },
    methods: {
      $_formStateSave_save({ name, fields, exclude = [], include = [] }) {
        let localForm = { ...this[fields] }

        if (include.length) {
          localForm = {}
          include.forEach((v) => {
            const originValue = this[fields][v]
            if (typeof originValue !== 'undefined') {
              localForm[v] = originValue
            }
          })
        }

        exclude.forEach((v) => {
          delete localForm[v]
        })

        localStorage.setItem(name, JSON.stringify(localForm))
      },

      /**
       * Публичный метод. Можно вызвать из компонента и удалить сохранённую форму из localStorage
       * Удалит значение из localStorage по имени формы
       * @param {string} formName - Имя формы
       */
      removeStateFromStore(formName) {
        localStorage.removeItem(formName)
      },
      $_formStateSave_set({ name, fields }) {
        const localForm = JSON.parse(localStorage.getItem(name))
        const originForm = this[fields]

        if (localForm) {
          for (const key in originForm) {
            const localProperty = localForm[key]
            if (typeof localProperty !== 'undefined') {
              originForm[key] = localProperty
            }
          }
        }
      },
      $_formStateSave_handleSaveForm(form) {
        this.$_formStateSave_save(form)
      }
    }
  }
}
