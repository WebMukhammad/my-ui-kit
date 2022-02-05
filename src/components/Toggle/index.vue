<template>
  <div>
    <slot :onClick="onClick" :isActive="isActive" />
  </div>
</template>

<docs>
Разные варианты:
```[import](./example/example.vue)
```
</docs>

<script>
/**
 * Функциональный компонент для активации контена, в компоненте нет какого-либо представления, лишь базовая логика для работы компонента
 */
export default {
  name: 'Toggle',
  props: {
    /**
     * Начальное значение для скрытого контента, по умолчанию false
     */
    initialValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isActive: this.initialValue
    }
  },
  methods: {
    onClick() {
      this.isActive = !this.isActive
    }
  }
}
</script>
