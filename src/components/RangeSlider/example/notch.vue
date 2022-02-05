<template>
  <div>
    <RangeSlider connect v-model="data" :pipsy="{ mode: 'range', density: 5 }" :range="{ min: 20, max: 80 }" />
    <div class="mt-40">Current value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 45
    }
  }
}
</script>
