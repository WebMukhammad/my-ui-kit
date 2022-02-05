import declOfNum from '../src/helper/declOfNum'

export default function Validator(
  { extend, setInteractionMode },
  { min, max, length, image, required, required_if: requiredIf, email, min_value: minValue }
) {
  extend('length', {
    ...length,
    message: 'Выберите {length} значения'
  })

  extend('email', {
    validate(value) {
      return !/[а-яё]+/i.test(value) && email.validate(value)
    },
    message: 'Проверьте почту'
  })

  extend('image', {
    ...image,
    message: 'Выберите картинку'
  })

  extend('required', {
    ...required,
    message: 'Заполните {_field_}'
  })

  extend('required_if', {
    ...requiredIf,
    message: 'Заполните {_field_}'
  })

  extend('min_value', {
    ...minValue,
    message: 'Минимальное значение {min}'
  })

  extend('min', {
    ...min,
    message: 'Минимальное кол-во символов {length}'
  })

  extend('max', {
    ...max,
    message: 'Максимальное кол-во символов {length}'
  })

  extend('phone', {
    validate(value) {
      const exp = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/)
      return exp.test(value)
    },
    message: 'Проверьте номер телефона'
  })

  extend('password', {
    validate(value) {
      const exp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!#$%\\^&*+=\-\\[\]\\';,/{}|\\":<>\\?])/)
      return exp.test(value)
    },
    message: 'Пароль должен содержать большие латинские буквы, маленькие латинские буквы и спец. символы'
  })

  extend('url', {
    validate(value) {
      const exp = new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
      )
      return exp.test(value)
    },
    message: 'Проверьте ссылку'
  })

  extend('sign-length', (value, length) => {
    if (value.length === +length) return true
    return `Введите ${length} ${declOfNum(length, ['символ', 'символа', 'символов'])}`
  })

  extend('filesize', {
    validate(value, { limit }) {
      // Преобразуем размер загружаемого файла из байтов в мегабайты, чтобы можно было сравнить со значением лимита
      const uploadFileSize = +(value[0].size / (1024 * 1024)).toFixed(2)
      if (uploadFileSize >= limit) return false
      return true
    },
    params: ['limit'],
    message: 'Размер фото не должен превышать {limit} Мб'
  })

  setInteractionMode('eager')
}
