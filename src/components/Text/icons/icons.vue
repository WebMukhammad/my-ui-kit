<template>
  <div class="icons-grid">
    <div v-for="icon in icons" :key="icon" class="icons-grid__row">
      <div class="icons-grid__col" :class="{ 'icons-grid__col_black': m === '_white' }" v-for="m in modifiers" :key="m">
        <div class="icons-grid__item">
          <div :class="['icon-' + icon, 'icon-' + icon + m]"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Все иконки, которые у нас есть в проекте
 */
export default {
  data() {
    return {
      modifiers: ['_black', '_white', '_red', '_grey', '_brown', '_disabled'],
      icons: [
        'add',
        'add-grey',
        'book',
        'card',
        'close',
        'search',
        'building',
        'dashboard',
        'new',
        'package',
        'wallet',
        'arrow-right',
        'arrow-bottom',
        'more',
        'notification',
        'setting',
        'bin',
        'archive',
        'back',
        'tick',
        'drag',
        'note',
        'loading-oval',
        'bonus-icon',
        'question',
        'map',
        'telegram',
        'whatsapp',
        'social-telegram',
        'social-whatsapp',
        'cart',
        'cart-white',
        'print',
        'warning',
        'comment',
        'bug',
        'reset',
        'eye',
        'eye-closed',
        'arrow',
        'download',
        'top-arrow',
        'right-arrow',
        'bottom-arrow',
        'left-arrow',
        'load',
        'calendar',
        'drag-handler',
        'qr-code',
        'menu'
      ]
    }
  }
}
</script>
