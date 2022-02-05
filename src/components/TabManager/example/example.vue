<template>
  <div>
    <TabManager>
      <template #default="{ onClick, activeIndex }">
        <ul>
          <li @click="onClick(index)" v-for="(item, index) in arrTabs" :key="index" :class="{ active: activeIndex === index }">
            {{ item }}
          </li>
        </ul>
        <template v-show="activeIndex">
          <div v-show="activeIndex === 0">1</div>
          <div v-show="activeIndex === 1">2</div>
          <div v-show="activeIndex === 2">3</div>
          <div v-show="activeIndex === 3">4</div>
        </template>
      </template>
    </TabManager>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrTabs: ['Первый', 'Второй', 'Третий', 'Четвёртый']
    }
  }
}
</script>

<style lang="postcss" scoped>
ul {
  display: flex;
  margin-bottom: 30px;
}
li {
  padding: 10px;
  border-bottom: 1px solid;
  cursor: pointer;
}
.active {
  color: red;
}
</style>
