<template>
  <TreeList
    class="list"
    :data="treeData"
    :getChild="getChild"
    itemsOnSameLevel="multiple"
    #default="{ item, hasChild, isOpen, isActiveLastOne, toggle }"
  >
    <div
      class="tree-item"
      @click="toggle"
      :class="{
        'tree-item_child': hasChild,
        'tree-item_open': isOpen,
        'tree-item_active': isActiveLastOne
      }"
    >
      {{ item.name }}
    </div>
  </TreeList>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 1,
          name: 'My Tree',
          departments: [
            { id: 2, name: 'hello' },
            { id: 3, name: 'wat' },
            {
              id: 4,
              name: 'child folder',
              vacancies: [
                {
                  id: 5,
                  name: 'child folder',
                  vacancies: [
                    { id: 6, name: 'hello' },
                    { id: 7, name: 'wat' }
                  ]
                },
                { id: 8, name: 'hello' },
                { id: 9, name: 'wat' },
                {
                  id: 10,
                  name: 'child folder',
                  vacancies: [
                    { id: 11, name: 'hello' },
                    { id: 12, name: 'wat' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 13,
          name: 'My Tree',
          departments: [
            { id: 14, name: 'hello' },
            { id: 15, name: 'wat' },
            {
              id: 16,
              name: 'child folder',
              vacancies: [
                {
                  id: 17,
                  name: 'child folder',
                  vacancies: [
                    { id: 18, name: 'hello' },
                    { id: 19, name: 'wat' }
                  ]
                },
                { id: 20, name: 'hello' },
                { id: 21, name: 'wat' },
                {
                  id: 22,
                  name: 'child folder',
                  vacancies: [
                    { id: 23, name: 'hello' },
                    { id: 24, name: 'wat' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    getChild(el) {
      if (el.vacancies) {
        return el.vacancies
      } else if (el.departments) {
        return el.departments
      }
    }
  }
}
</script>

<style lang="postcss">
.list {
  max-width: 350px;
  padding-bottom: 10px;
  margin: 0px auto;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid #cecece;
  border-radius: 4px;
}

.tree-item {
  padding: 7px 9px;
  border-bottom: 1px solid #cecece;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.tree-item_child:before {
  content: '+';
  display: inline-block;
  width: 14px;
  height: 18px;
  flex-shrink: 0;
}
.tree-item_child.tree-item_open:before {
  content: '-';
}
.tree-item_active {
  background: #fffae5;
}
</style>
