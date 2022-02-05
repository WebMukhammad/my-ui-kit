<template>
  <div class="note" :class="[`note_${this.theme} note_${this.size}-size`]">
    <slot />
  </div>
</template>

<docs>
  Стандартная плашка:
  ```
  <Note class="p">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на
    русском языке.
  </Note>
  ```

  На красном фоне:
  ```
  <Note class="p" theme="reddish">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на
    русском языке.
  </Note>
  ```
</docs>

<script>
/**
 * Плашка на цветном фоне для создания акцента на элементах
 */
export default {
  name: 'Note',
  props: {
    /**
     * Фон цветной плашки
     * @values reddish, yellow
     */
    theme: {
      type: String,
      default: 'yellow'
    },
    /**
     * Размер плашки, поддерживается ограниченное кол-во
     * @values s, m
     */
    size: {
      default: 's',
      type: String
    }
  }
}
</script>

<style lang="postcss">
.note {
  border-radius: 5px;
  &_reddish {
    background-color: #fcf7f6;
    border: 1px solid #efe5e3;
  }
  &_yellow {
    background-color: #fffae5;
    border: 1px solid #efe9cc;
  }
  &_s-size {
    padding: 8px 13px;
  }
  &_m-size {
    padding: 22px 23px 24px;
  }

  @media (max-width: 800px) {
    &_m-size {
      padding: 15px 17px 17px;
    }
  }
}
</style>
