<template>
  <div>
    <ValidationProvider v-slot="{ errors, validate }" rules="required|email" name="почту">
      <TinyInput value="Очень длинная строка" @input="validate" :error="!!errors[0]" />
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  }
}
</script>
