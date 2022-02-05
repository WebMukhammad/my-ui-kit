<template>
  <div>
    <Button @click="showSuccess" theme="green" class="mb-5">Успешное состояние</Button>
    <Button @click="showError" class="mb-5">Состояние ошибки</Button>
    <Button @click="showWarning" theme="green" class="mb-5">Состояние предупреждения</Button>
    <Button @click="showLoading" theme="blue">Состояние загрузки</Button>
  </div>
</template>

<script>
import Tooltip from '@lib/Tooltip'
export default {
  components: {
    Tooltip
  },
  methods: {
    showError() {
      Tooltip()
    },
    showSuccess() {
      Tooltip({ type: 'success' })
    },
    showWarning() {
      Tooltip({ type: 'warning', mobileOffset: [0, 0, 10, 0] })
    },
    showLoading() {
      Tooltip({ type: 'loading' })
    }
  }
}
</script>
