<template>
  <div>
    <RadioList
      column="2"
      :list="[
        { name: 'Махачкала', value: 1 },
        { name: 'Ижевск', value: 2 },
        { name: 'Москва', value: 3 }
      ]"
      v-model="data"
      name="city"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  }
}
</script>
