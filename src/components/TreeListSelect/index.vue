<template>
  <div class="tree-list-select">
    <div v-if="search" :class="[{ 'tree-list-select__list-search-wrap': searchStickOnScroll }]">
      <ListSearch
        :list="searchData"
        :isClearQuery="isClearQuery"
        :searchAdapter="searchAdapter"
        :search-stick-on-scroll="searchStickOnScroll"
        @input="onSearchInput"
        @focus="onSearchFocus"
        inputPadding="0px 14px"
      >
        <template #default="{ item }">
          <div
            class="item"
            :class="{ item_selected: isSelected({ ...item, value: item[namePropValue], exludeNested: false }) }"
            @click="
              onItemClick({
                name: item.name,
                [namePropValue]: item[namePropValue]
              })
            "
          >
            {{ item.name }}
          </div>
        </template>
        <template #empty="{ text }">
          <div class="pb-8 px-14">{{ text }}</div>
        </template>
      </ListSearch>
    </div>
    <template v-if="!searchQuery">
      <div class="tree-list-select__header" v-show="path.length > 1">
        <div class="tree-list-select__back-to-previous" @click="backToPrevious"></div>
        <div class="tree-list-select__title">{{ currentParent.name }}</div>
      </div>
      <div class="tree-list-select__list">
        <div
          v-if="path.length > 1"
          class="item"
          :class="{ item_selected: isSelected({ ...currentParent, value: currentParent[namePropValue] }) }"
          @click="
            onItemClick({
              [namePropValue]: currentParent[namePropValue],
              name: currentParent.name
            })
          "
        >
          Выбрать «{{ currentParent.name }}»
        </div>
        <div
          v-for="item in path[path.length ? path.length - 1 : 0].list"
          :key="item[namePropValue]"
          class="item"
          :class="{
            item_selected: isSelected({ ...item, value: item[namePropValue] }),
            item_nested: hasChild(item)
          }"
          @click="onItemClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.css" scoped></style>

<docs>
  Древовидный список:
  ```
  <TreeListSelect
    :list="[
      {
        name: 'Махачкала',
        value: '1',
        children: [
          {
            name: 'Питер',
            value: '2',
            children: [
              { name: 'Ижевск', value: '3' },
              { name: 'Москва', value: '4' },
              { name: 'Питер', value: '5' }
            ]
          },
          { name: 'Ижевск', value: '6' },
          { name: 'Москва', value: '7' },
          { name: 'Ижевск', value: '8' },
          { name: 'Москва', value: '9' },
          { name: 'Ижевск', value: '10' },
          { name: 'Москва', value: '11' },
          { name: 'Ижевск', value: '12' },
          { name: 'Москва', value: '13' },
          { name: 'Ижевск', value: '14' },
          { name: 'Москва', value: '15' },
          { name: 'Ижевск', value: '16' },
          { name: 'Москва', value: '17' },
          { name: 'Ижевск', value: '18' },
          { name: 'Москва', value: '19' },
          { name: 'Казань', value: '20' },
          { name: 'Уфа', value: '21' },
        ]
      },
      { name: 'Ижевск', value: '22' },
      { name: 'Москва', value: '23' },
      { name: 'Питер', value: '24' },
      { name: 'Казань', value: '25' },
      { name: 'Уфа', value: '26' },
    ]"
  />
  ```

  С поиском:
  ```
  <TreeListSelect
    search
    :list="[
      {
        name: 'Махачкала',
        value: '1',
        children: [
          {
            name: 'Питер',
            value: '2',
            children: [
              { name: 'Ижевск', value: '3' },
              { name: 'Москва', value: '4' },
              { name: 'Питер', value: '5' }
            ]
          },
          { name: 'Ижевск', value: '6' },
          { name: 'Москва', value: '7' },
          { name: 'Ижевск', value: '8' },
          { name: 'Москва', value: '9' },
          { name: 'Ижевск', value: '10' },
          { name: 'Москва', value: '11' },
          { name: 'Ижевск', value: '12' },
          { name: 'Москва', value: '13' },
          { name: 'Ижевск', value: '14' },
          { name: 'Москва', value: '15' },
          { name: 'Ижевск', value: '16' },
          { name: 'Москва', value: '17' },
          { name: 'Ижевск', value: '18' },
          { name: 'Москва', value: '19' },
          { name: 'Казань', value: '20' },
          { name: 'Уфа', value: '21' },
        ]
      },
      { name: 'Ижевск', value: '22' },
      { name: 'Москва', value: '23' },
      { name: 'Питер', value: '24' },
      { name: 'Казань', value: '25' },
      { name: 'Уфа', value: '26' },
    ]"
  />
  ```
</docs>
