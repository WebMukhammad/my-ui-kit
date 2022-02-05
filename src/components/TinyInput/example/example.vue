<template>
  <div>
    <TinyInput v-model="text" postfix="шт." />
    <div class="mt-10">Значение из value: {{ text }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null
    }
  }
}
</script>
