<template>
  <div>
    <Toggle>
      <template #default="{ onClick, isActive }">
        <FormElement v-if="isActive" helper="Подсказка для чеклиста" class="mt-20">
          <CheckboxList
            :list="[
              { name: 'Махачкала', value: 1 },
              { name: 'Ижевск', value: 2 },
              { name: 'Москва', value: 3 }
            ]"
          />
        </FormElement>
        <Button @click="onClick">При клике</Button>
      </template>
    </Toggle>
  </div>
</template>
