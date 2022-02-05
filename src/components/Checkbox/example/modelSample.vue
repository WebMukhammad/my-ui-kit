<template>
  <div>
    <Checkbox v-model="checkboxData" :value="3">Пример чекбокса</Checkbox>
    <div class="mt-10">Значение: {{ checkboxData }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkboxData: true
    }
  }
}
</script>
