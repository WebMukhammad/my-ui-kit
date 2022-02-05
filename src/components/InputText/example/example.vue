<template>
  <div>
    <InputText v-model="text" placeholder="Введите город" />
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
