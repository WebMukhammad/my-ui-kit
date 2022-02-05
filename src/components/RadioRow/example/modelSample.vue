<template>
  <div>
    <RadioRow
      :list="[
        { name: 'Первый', value: 1 },
        { name: 'Второй', value: 2 },
        { name: 'Третий', value: 3 }
      ]"
      v-model="data"
    >
      <template #default="{ item }">
        {{ item.name }}
      </template>
    </RadioRow>
    <div class="mt-10">Выбраное значение по value: {{ data }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: 2
    }
  }
}
</script>
