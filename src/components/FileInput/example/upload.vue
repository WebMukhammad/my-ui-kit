<template>
  <FileInput multiple :uploadTo="handleUpload"></FileInput>
</template>

<script>
export default {
  methods: {
    handleUpload(formData) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data: 'success' }), 4000)
      })
    }
  }
}
</script>
