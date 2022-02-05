<template>
  <div>
    <RangeSlider connect v-model="data" :range="{ min: 20, max: 80 }" />
    <div class="mt-10">Current value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [45, 60]
    }
  }
}
</script>
