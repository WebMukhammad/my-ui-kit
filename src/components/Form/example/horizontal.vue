<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <Form adaptive-on900 @submit="handleSubmit(onSubmit)">
      <ValidationProvider v-slot="{ errors }" rules="required|email" name="почту">
        <FormElement title="Введите почту" :error="errors[0]">
          <InputText v-model="data.email" :error="!!errors[0]" />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required" name="город">
        <FormElement title="Выберите город" :error="errors[0]">
          <Select
            placeholder="Выберите город"
            v-model="data.cityFromSelect"
            :data="[
              { name: 'Махачкала', value: '1' },
              { name: 'Ижевск', value: '2' },
              { name: 'Москва', value: '3' },
              { name: 'Питер', value: '4' },
              { name: 'Казань', value: '5' },
              { name: 'Уфа', value: '6' },
              { name: 'Махачкала', value: '7' },
              { name: 'Ижевск', value: '8' },
              { name: 'Москва', value: '9' },
              { name: 'Питер', value: '10' },
              { name: 'Казань', value: '11' },
              { name: 'Уфа', value: '12' }
            ]"
          />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|length:2" name="город получения">
        <FormElement title="Выберите город получения" :error="errors[0]">
          <CheckboxList
            :list="[
              { name: 'Махачкала', value: 1 },
              { name: 'Ижевск', value: 2 },
              { name: 'Москва', value: 3 }
            ]"
            v-model="data.city"
          />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|min_value:30" name="сумму">
        <FormElement title="Введите сумму" :error="errors[0]">
          <RangeInput v-model="data.price" />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required" name="картинку">
        <FormElement title="Загрузите картинку" :error="errors[0]">
          <FileInput v-model="data.photo" />
        </FormElement>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required" name="чекбокс">
        <FormElement title="Подтвердить согласие" :error="errors[0]">
          <Checkbox v-model="data.active">Я согласен отправить форму</Checkbox>
        </FormElement>
      </ValidationProvider>
      <Button v-if="submited" theme="submited" icon="tick" disabled>Запрос отправлен</Button>
      <Button v-else theme="red">Отправить</Button>
    </Form>
    <div v-if="submited" class="mt-20 p">
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

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      data: {},
      submited: false,
      resetWatcher: null
    }
  },
  methods: {
    onSubmit() {
      this.submited = true
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
