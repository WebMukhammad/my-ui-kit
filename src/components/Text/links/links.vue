<template>
  <div>
    <div class="links-grid fz-14">
      <div class="h3 mb-15">Иконки перед ссылками</div>
      <div v-for="icon in icons" :key="icon" class="links-grid__row mb-15">
        <div class="link-grid__col" v-for="c in color" :key="c">
          <a href="#" :class="['link-icon link-icon link-icon_' + c]">
            <div :class="[`link-icon__icon-` + icon]"></div>
            <div class="link-icon__text">Ссылка</div>
          </a>
        </div>
      </div>
    </div>
    <div class="links-grid fz-14">
      <div class="h3 mb-15 mt-25">Иконки после ссылок</div>
      <div v-for="icon in icons" :key="icon" class="links-grid__row mb-15">
        <div class="link-grid__col" v-for="c in color" :key="c">
          <a href="#" :class="['link-icon link-icon link-icon_' + c]">
            <div class="link-icon__text">Ссылка</div>
            <div :class="[`link-icon__icon-` + icon]"></div>
          </a>
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
      color: ['green', 'blue', 'red', 'grey', 'white'],
      icons: ['card', 'login', 'lock', 'cart', 'warning', 'comment', 'bug', 'bin', 'top-arrow', 'right-arrow', 'bottom-arrow', 'left-arrow']
    }
  }
}
</script>
