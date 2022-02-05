<template>
  <div :style="{ userSelect: userSelect }">
    <TreeItem
      v-for="item in data"
      @enable="enable"
      @disable="disable"
      :level="1"
      :path="path"
      :value="value"
      :item="item"
      :key="getItemKey(item)"
      :getChild="getChild"
      :getItemKey="getItemKey"
      :childPadding="childPadding"
      #default="{ item, toggle, isOpen, hasChild, isActiveLastOne, level }"
    >
      <!--
        @slot Слот для каждого отдельного пункта списка, он принимает через слот-скоуп все нужные параметры для работы
        @binding {object} item - кусок данных из массива data, который относится к этому пункту
        @binding {function} toggle - функцию, которую нужно повестить на клик для открытия вложенного списка
        @binding {boolean} isOpen - относительно значения можно понять, нужно ли открыть список
        @binding {boolean} hasChild - если ли у этого пункта дети т.е. вложенный список
        @binding {boolean} isActiveLastOne - последний ли это активированный пункт т.е. последний пункт на который пользователь кликнул
        @binding {number} level - уровень вложенности, на котором находится этот элемент списка
      -->
      <slot :item="item" :toggle="toggle" :isOpen="isOpen" :hasChild="hasChild" :isActiveLastOne="isActiveLastOne" :level="level" />
    </TreeItem>
  </div>
</template>

<docs>
Можно открыть сколько угодно пунктов:
```[import](./example/multiple.vue)
```

Можно открыть один пункт, все предыдущий будут скрываться, также нельзя выбрать пункт в котором
есть вложенность и при повторном клике пункт будет деактивирован:
```[import](./example/one.vue)
```
</docs>

<script>
import TreeItem from '@src/components/TreeList/TreeItem'

/**
 * Функциональный компонент для древовидных списков, у компонента нет представления,
 * но он предоставляет всю нужную логику для работы, которую можно гибко сконфигурировать
 * и настроить внешний вид для неё
 */
export default {
  name: 'TreeList',
  props: {
    /**
     * Массив с древовидными списками, у каждого элемента списка может быть неограниченное
     * кол-во вложенных списков
     */
    data: {
      type: Array,
      required: true
    },
    /**
     * Если у каждого элемента списка дети называются по-разному, можно передать функцию
     * которая будет вызываться на каждом элементе, чтобы получить у неё ребёнка
     */
    getChild: {
      type: [Function],
      default: (el) => {
        return el.child
      }
    },
    /**
     * Функция должна вернуть уникальный key, который будет использован при итерации списка
     */
    getItemKey: {
      type: [Function],
      default: (el) => {
        return el.id
      }
    },
    /**
     * Режим работы списка при активации пунктов, можно активировать один пункт за раз и при
     * этом остальные аткивные закрывать, а можно открывать все и не закрывать ничего при их активации
     * @values one, multiple
     */
    itemsOnSameLevel: {
      type: String,
      default: 'one',
      validator: (el) => ['one', 'multiple'].some((x) => x === el)
    },
    /**
     * Можно ли выбирать (т.е. активировать) пункт у которого есть вложенность
     */
    canChooseNested: {
      type: Boolean,
      default: true
    },
    /**
     * Стиль, который вешается на весь список, по дефолту none т.к. повторные клики по списку
     * добавляют ненужное выделение
     */
    userSelect: {
      type: String,
      default: 'none'
    },
    /**
     * Отступ у обертки вокруг каждого вложенного списка
     */
    childPadding: {
      type: String,
      default: '0px 0px 0px 10px'
    },
    /**
     * Нужно ли скидывать активность пункта при повторном клике
     */
    resetActiveOnSecondClick: {
      type: Boolean,
      default: false
    },
    /**
     * Последний активированный пункт
     */
    value: {
      type: Object,
      default: null
    }
  },
  components: {
    TreeItem
  },
  methods: {
    enable({ level, item }) {
      let value
      if (this.itemsOnSameLevel === 'one') {
        value = [item]
        if (this.path.length > level) this.path.splice(level)
      } else {
        value = this.getMultipleValue({ level, item })
      }
      this.$set(this.path, level - 1, value)
      this.$emit('enable', { item, path: this.path })
    },
    getMultipleValue({ level, item }) {
      return Array.isArray(this.path[level - 1]) ? [item, ...this.path[level - 1]] : [item]
    },
    disable({ level, item }) {
      if (this.itemsOnSameLevel === 'one') {
        this.path.splice(level - 1)
      } else {
        this.disableMultiple({ level, item })
      }

      this.$emit('disable', { item, resetIfAlreadyActive: this.resetActiveOnSecondClick, path: this.path })
    },
    disableMultiple({ level, item }) {
      const currentLevel = this.path[level - 1]
      if (Array.isArray(currentLevel)) {
        const index = currentLevel.findIndex((el) => el === item)
        if (index !== -1) currentLevel.splice(index, 1)
      }
    }
  },
  data() {
    return {
      path: []
    }
  }
}
</script>
