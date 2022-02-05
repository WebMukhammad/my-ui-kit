<template>
  <div>
    <InputButton v-model="value" :state="state" @click="onClick" />
    <div class="p mt-15">Текущее значение в инпута {{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'default',
      value: null
    }
  },
  methods: {
    onClick() {
      this.state = 'loading'
      setTimeout(() => {
        this.state = 'success'
        const resetWatcher = this.$watch('value', () => {
          this.state = 'default'
          resetWatcher()
        })
      }, 1500)
    }
  }
}
</script>
