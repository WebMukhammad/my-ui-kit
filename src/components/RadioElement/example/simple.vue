<template>
  <div>
    <RadioElement v-model="data" value="1">Ижевск</RadioElement>
    <div class="mt-10">Значение: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: false
    }
  }
}
</script>
