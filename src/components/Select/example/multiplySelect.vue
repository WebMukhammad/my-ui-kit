<template>
  <div>
    <Select
      placeholder="Выберите город"
      search
      multiple
      multiple-view="count"
      v-model="data"
      :data="[
        { name: 'Махачкала', value: 'q1' },
        { name: 'Ижевск', value: 'w2' },
        { name: 'Москва', value: 'e3' },
        { name: 'Питер', value: 'r4' },
        { name: 'Казань', value: 't5' },
        { name: 'Уфа', value: 'y6' }
      ]"
    />
    <div class="mt-10">Выбранное value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ['q1']
    }
  }
}
</script>
