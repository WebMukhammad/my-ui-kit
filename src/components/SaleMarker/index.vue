<template>
  <span class="sale-marker" :style="{ backgroundColor: color }" :is="href ? 'a' : 'span'" :href="href">
    <!-- @slot Содержание маркера, почти всегда это обычный текст -->
    <slot></slot>
  </span>
</template>

<docs>
  Разные варианты:
  ```
  <SaleMarker>скидка</SaleMarker>
  <SaleMarker color="#ee138b">подарок</SaleMarker>
  <SaleMarker color="#ee6413">комбо со скидкой</SaleMarker>
  ```

  Маркер, который занимает больше одной строки:
  ```
  <SaleMarker color="#ee138b">очень-очень длинное<br>название акции</SaleMarker>
  ```

  Маркер-ссылка:
  ```
  <SaleMarker color="#ee138b" href="https://05.ru">маркер-ссылка</SaleMarker>
  ```
</docs>

<script>
/**
 * Маркер для акции
 */
export default {
  name: 'SaleMarker',
  props: {
    /**
     * Фон маркера, принимает HEX-цвет
     */
    color: {
      type: String,
      default: '#482fff'
    },
    /**
     * Если этот пропс передан, то элемент становится ссылкой и при клике совершается переход по переданному адресу
     */
    href: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="postcss">
.sale-marker {
  font-size: 12px;
  line-height: 14px;
  padding: 1px 6px 2px;
  color: #fff;
  border-radius: 8px;
  box-decoration-break: clone;
  text-decoration: none;
}

a.sale-marker {
  opacity: 1;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 0.7;
  }
}
</style>
