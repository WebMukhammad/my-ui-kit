<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <Form @submit="handleSubmit(onSubmit)">
      <ValidationProvider v-slot="{ errors }" rules="required|email" name="почту">
        <FormElement title="Введите почту" :error="errors[0]">
          <InputText v-model="data.email" :error="!!errors[0]" />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|min_value:30" name="сумму">
        <FormElement title="Введите сумму" :error="errors[0]">
          <RangeInput v-model="data.price" />
        </FormElement>
      </ValidationProvider>
      <Button v-if="submited" theme="submited" icon="tick" disabled>Запрос отправлен</Button>
      <Button v-else theme="red">Отправить</Button>
    </Form>
    <div v-if="submited" class="mt-10 p">
      <div class="dash-list">
        <div class="dash-list__item" v-for="(value, name) in data" :key="name">
          <span class="b">{{ name }}</span
          >: {{ value }}
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import saveStateToStorage from '../../../../lib/saveStateToStorage'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mixins: [saveStateToStorage([{ name: 'example-form', fields: 'data' }])],
  data() {
    return {
      data: {
        email: null,
        price: 0
      },
      submited: false,
      resetWatcher: null
    }
  },
  methods: {
    onSubmit() {
      this.submited = true
      /**
       * После использования saveStateToStorage
       * добавится публичный метод к экземпяру который
       * удалит данные формы из localStorage
       * @param {string} formName - Имя формы
       */
      this.removeStateFromStore('example-form')

      this.resetWatcher = this.$watch(
        'data',
        function () {
          this.submited = false
          this.resetWatcher()
        },
        {
          deep: true
        }
      )
    }
  }
}
</script>
