<template>
  <div>
    <RangeInput :min="min" :max="max" v-model="test" />
    <Button class="mt-20" @click="increment">Увеличиваем min на 10</Button>
    <Button class="mt-20" @click="decrement">Уменьшаем max на 10</Button>
    <div class="p mt-15">Value: {{ test }}</div>
    <div class="p mt-15">min: {{ min }}</div>
    <div class="p mt-15">max: {{ max }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: null,
      min: 10,
      max: 100
    }
  },
  methods: {
    increment() {
      this.min += 10
    },
    decrement() {
      this.max -= 10
    }
  }
}
</script>
