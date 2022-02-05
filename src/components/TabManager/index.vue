<template>
  <div>
    <!-- @slot Через слоты мы передаем метод onClick, который должен активироваться при клике на таб и в него мы передаем индекс данного таба, activeIndex - индекс активного таба -->
    <slot :onClick="onClick" :activeIndex="activeIndex"></slot>
  </div>
</template>

<docs>
Разные варианты:
```[import](./example/example.vue)
```
</docs>

<script>
/**
 * Функциональный компонент для переключения табов с контентом, в компоненте нет какого-либо представления, лишь базовая логика для работы компонента
 */
export default {
  name: 'TabManager',
  props: {
    /**
     * Индекс таба, который будет отображаться по умолчанию, дефолтное значение 0
     */
    initialIndex: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      activeIndex: this.initialIndex
    }
  },
  methods: {
    onClick(index) {
      this.activeIndex = index
    }
  }
}
</script>
