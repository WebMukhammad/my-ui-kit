<template>
  <div>
    <slot :item="item" :toggle="toggle" :isOpen="isOpen" :hasChild="hasChild" :isActiveLastOne="isActiveLastOne" :level="level">
      <div @click="toggle">
        {{ item.name }}
      </div>
    </slot>
    <div v-show="isOpen" v-if="childList" :style="{ padding: childPadding }">
      <TreeItem
        v-for="child in childList"
        :key="getItemKey(child)"
        :item="child"
        :level="level + 1"
        :childPadding="childPadding"
        :path="path"
        :value="value"
        :getChild="getChild"
        :getItemKey="getItemKey"
        @enable="$emit('enable', $event)"
        @disable="$emit('disable', $event)"
        #default="{ item, toggle, isOpen, hasChild, isActiveLastOne, level }"
      >
        <slot :item="item" :toggle="toggle" :isOpen="isOpen" :hasChild="hasChild" :isActiveLastOne="isActiveLastOne" :level="level" />
      </TreeItem>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    path: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      default: null
    },
    item: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    childPadding: {
      type: String,
      default: null
    },
    getChild: {
      type: Function,
      required: true
    },
    getItemKey: {
      type: [Function],
      required: true
    }
  },
  computed: {
    hasChild() {
      return !!this.childList
    },
    isOpen() {
      const currentLevel = this.path[this.level - 1]
      return currentLevel?.some((el) => el === this.item)
    },
    isActiveLastOne() {
      return this.value === this.item
    },
    childList() {
      return this.getChild(this.item)
    }
  },
  methods: {
    toggle() {
      if (this.isOpen) {
        this.$emit('disable', {
          level: this.level,
          item: this.item,
          hasChild: this.hasChild
        })
      } else {
        this.$emit('enable', {
          level: this.level,
          item: this.item,
          hasChild: this.hasChild
        })
      }
    }
  }
}
</script>
