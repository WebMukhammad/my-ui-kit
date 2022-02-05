<template>
  <div>
    <CheckboxList
      row
      elementMargin="0 20px 10px 0"
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
