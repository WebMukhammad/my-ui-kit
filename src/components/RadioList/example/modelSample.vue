<template>
  <div>
    <RadioList
      :list="[
        { name: 'Махачкала', value: 1 },
        { name: 'Ижевск', value: 2 },
        { name: 'Москва', value: 3 }
      ]"
      v-model="data"
      name="city"
    />
    <div class="mt-10">Выбраное значение по value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 3
    }
  }
}
</script>
