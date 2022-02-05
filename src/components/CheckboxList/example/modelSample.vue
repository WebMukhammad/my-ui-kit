<template>
  <div>
    <CheckboxList
      :list="[
        { name: 'Махачкала', value: 1 },
        { name: 'Ижевск', value: 2 },
        { name: 'Москва', value: 3 }
      ]"
      v-model="listData"
      name="city"
    />
    <div class="mt-10">Выбранные значение по value: {{ listData }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: []
    }
  }
}
</script>
