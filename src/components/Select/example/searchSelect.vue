<template>
  <div>
    <Select
      placeholder="Выберите город"
      search
      v-model="data"
      :data="[
        { name: 'Махачкала', value: '1' },
        { name: 'Ижевск', value: '2' },
        { name: 'Москва', value: '3' },
        { name: 'Питер', value: '4' },
        { name: 'Казань', value: '5' },
        { name: 'Уфа', value: '6' }
      ]"
    />
    <div class="mt-10">Выбранное value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: '1'
    }
  }
}
</script>
