<template>
  <div>
    <FileInput v-model="data" multiple></FileInput>
    <div class="wrapper">
      <div class="img" v-for="(el, i) in data" :key="i">
        <img class="img__photo" :src="getImgUrl(el)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    getImgUrl(file) {
      return URL.createObjectURL(file)
    }
  }
}
</script>

<style lang="postcss">
.wrapper {
  margin-top: 10px;
  display: flex;
}

.img {
  width: 80px;
  height: 80px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img__photo {
  max-width: 100%;
  max-height: 100%;
}
</style>
