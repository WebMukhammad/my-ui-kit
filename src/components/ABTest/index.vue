<template>
  <div v-if="winner">
    <!-- @slot Передайте в именнованные слоты где data.name равна слоту -->
    <slot :name="winner"></slot>
  </div>
</template>

<docs>
Пример теста на цвет кнопки. Обратите внимание на weight. Slot red будет рендериться в 33% случаев, а green будет
появляться в 2 раза чаще.
```

<ABTest
  :name="'button-color'"
  :data="[
        { name: 'red', weight: 1 },
        { name: 'green', weight: 2 }
      ]"
>
  <template #red>
    <div>
      <Button theme="red">Red Button</Button>
    </div>
  </template>
  <template #green>
    <div>
      <Button theme="green">Green Button</Button>
    </div>
  </template>
</ABTest>
```
</docs>

<script>
import cookie from 'cookie'
/**
 * Функциональный компонент для AB тестов. Для работы с SSR Nuxt нужно установить cookie-universal-nuxt
 */
export default {
  name: 'ABTest',
  props: {
    /**
     * Массив объектов где name имя слота, weight целое
     * число вероятности что этот компонент покажется пользователю
     * @values [{name: String, weight: Number}]
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * Уникальное имя теста
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Нужно подключить Яндекс Метрику чтоб отправлялись параметры визита для варианта который отобразился пользователю.
     * По умолчанию проверяется наличие плагина (this.$metrika), если плагин есть параметры передадутся в метод params.
     * Можно выключить передав false
     */
    yandexMetrika: {
      type: Boolean,
      default() {
        const hasMetrika = Boolean(this?.$metrika)
        return hasMetrika
      }
    }
  },
  fetch() {
    // SSR mode rendering
    if (this.$nuxt.context.req) {
      const cookieWinner = this.getCookie(`ab-test-${this.name}`, this.$nuxt.context.req.headers.cookie)
      this.setWinner(cookieWinner)
    }
  },
  data: () => ({
    winner: null
  }),
  beforeMount() {
    // SPA mode rendering
    if (!this.winner) {
      const cookieWinner = this.getCookie(`ab-test-${this.name}`, document.cookie)
      this.setWinner(cookieWinner)
    }

    document.cookie = cookie.serialize(`ab-test-${this.name}`, this.winner, { path: '/', maxAge: 2592000 })
  },
  mounted() {
    this.saveTestForDebug({ name: this.name, winner: this.winner, list: this.data })
    if (this.yandexMetrika) {
      this.sendYMParams()
    }
  },
  beforeDestroy() {
    this.removeTestForDebug()
  },
  methods: {
    /**
     * Сохраняет тест в глобальный объект для отладки другими компонентами.
     */
    saveTestForDebug(test) {
      if (window?.debug?.tests?.length) {
        window.debug.tests.push(test)
      } else {
        if (window.debug) {
          window.debug.tests = [test]
        } else {
          window.debug = {}
          window.debug.tests = [test]
        }
      }
    },
    removeTestForDebug() {
      const index = window.debug.tests.findIndex((el) => el.name === this.name)
      if (index > -1) {
        window.debug.tests.splice(index, 1)
      }
    },
    sendYMParams() {
      const params = {}

      params[this.name] = this.winner
      this.$metrika.params(params)
    },
    getCookie(name, strCookie) {
      const cookies = cookie.parse(strCookie)
      return cookies[name]
    },
    setWinner(winner) {
      if (winner) {
        this.winner = winner
      } else {
        this.winner = this.getWinner(this.data)
      }
    },
    getWinner(data) {
      const sum = data.reduce((acc, v) => v.weight + acc, 0)
      let rnd = Math.random() * sum

      const item = data.find((i) => {
        if (rnd - i.weight <= 0) {
          return true
        } else {
          rnd = rnd - i.weight
          return false
        }
      })

      return item.name
    }
  }
}
</script>
