<template>
  <div>
    <p class="p">Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки. Как правило, ни того, ни другого в момент показа эскизов у дизайнера нету. Что же делает 
      <span v-for="(type, i) in types" :key="i" class="ml-7 mr-7"><StatusBlock :type="type" size="s" /></span>дизайнер? Рыбу. Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки.
    </p>
    <div v-for="(size, j) in sizes" :key="j">
      <div v-for="(type, k) in types" :key="k">
        <StatusBlock :type="type" :size="size" contentWidth="300px" :description="type === 'loading' ? '' : 'Чтобы показать заказчику эскизы, нужно где-то найти тексты и картинки.'"></StatusBlock>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizes: ['s','m', 'l'],
      types: ['loading', 'error', 'empty', 'warning']
    }
  }
}
</script>