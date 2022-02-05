<template>
  <div>
    <RangeInput v-model="test" :min="0" :max="10000" prefix="От:" />
    <div class="p mt-15">Value: {{ test }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 25
    }
  }
}
</script>
