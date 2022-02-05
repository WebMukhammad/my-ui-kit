<template>
  <div>
    <CheckboxList
      column="2"
      :list="[
        { name: 'Махачкала', value: 1 },
        { name: 'Ижевск', value: 2 },
        { name: 'Москва', value: 3 }
      ]"
      v-model="listData"
      name="city"
    />
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
