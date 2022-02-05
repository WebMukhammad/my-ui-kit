<template>
  <div>
    <Textarea placeholder="Введите подробное описание" v-model="value" />
    <div class="mt-15 p">Значение из поля: {{ value }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null
    }
  }
}
</script>
