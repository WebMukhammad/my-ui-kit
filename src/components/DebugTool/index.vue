<template>
  <div v-shortkey="['ctrl', 'shift', 'alt', 'arrowup']" @shortkey="toggle">
    <transition name="slide-up">
      <div v-if="isOpen" class="container">
        <TabManager>
          <template #default="{ onClick, activeIndex }">
            <div class="header">
              <div class="header_tabs">
                <ul class="header-list">
                  <li
                    @click="onClick(index)"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :class="{ 'header-list__item_active': activeIndex === index }"
                    class="header-list__item"
                  >
                    {{ tab }}
                  </li>
                </ul>
              </div>
              <button class="header__close-button" @click="toggle">
                <div class="icon-close icon-close_white"></div>
              </button>
            </div>
            <template v-show="activeIndex">
              <div class="tab-container" v-show="activeIndex === 0">
                <ABTool :tests="tests" />
              </div>
            </template>
          </template>
        </TabManager>
      </div>
    </transition>
  </div>
</template>

<docs>
Компонент позволяет вывести меню для отладки сайта. Можно подключать разные инструменты.
Вызывается через комбинацию клавиш  ctrl + alt + shift + arrowup
```
<DebugTool />
```

Инструмент отладки AB Тестов. Позволяет переключить вариант отображения прописанный в тесте. 
Требуется перезагрузка страницы после выбора другого варианта.
```
<p class='p mb-8'>Название теста debug-tool </p>

<ABTest
  :name="'debug-tool'"
  :data="[
        { name: 'red', weight: 1 },
        { name: 'green', weight: 2 }
      ]"
>
  <template #red>
    <div>
      <Button theme="red">Red Button</Button>
    </div>
  </template>
  <template #green>
    <div>
      <Button theme="green">Green Button</Button>
    </div>
  </template>
</ABTest>
```
</docs>

<script>
import TabManager from '../TabManager'
import ABTool from './tools/ABTool'

export default {
  name: 'DebugTool',
  components: {
    TabManager,
    ABTool
  },
  data: () => ({
    isOpen: false,
    tests: null,
    tabs: ['A/B тесты']
  }),
  watch: {
    isOpen(value) {
      if (value) {
        this.tests = window?.debug?.tests
      }
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="postcss" scoped>
.container {
  width: 500px;
  overflow: hidden;
  z-index: 101;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: #202020;
  color: white;
  padding: 0 0 16px;
}

.tab-container {
  overflow: auto;
  max-height: 400px;
}

.header {
  padding: 16px 20px 12px;
  display: flex;

  &-list {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    padding-bottom: 20px;
    margin-bottom: -20px;

    &__item {
      margin-right: 15px;
      position: relative;
      cursor: pointer;
      padding-bottom: 8px;
      font-size: 13px;

      &_active::before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: #e30613;
      }
    }
  }

  &__tabs {
    flex: 1;
    overflow: auto;
    margin-right: 20px;
  }

  &__close-button {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    outline-offset: 4px;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.2s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(150%);
}
</style>
