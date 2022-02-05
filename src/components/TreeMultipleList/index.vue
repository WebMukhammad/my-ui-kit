<template>
  <div class="tree-multiple-list">
    <div v-if="search" :class="[{ 'tree-multiple-list__list-search-wrap': searchStickOnScroll }]">
      <ListSearch
        :list="searchData"
        :emptySearchText="emptySearchText"
        :searchAdapter="searchAdapter"
        :search-stick-on-scroll="searchStickOnScroll"
        @input="onSearchInput"
        @focus="onSearchFocus"
        inputPadding="0px 14px"
      >
        <template #default="{ item }">
          <div class="item" @click="onItemClick({ item, event: $event, selectNestedInsteadNavigateInto: true })">
            <Checkbox
              :value="item[namePropValue]"
              :checked="val.some((el) => el[namePropValue] === item[namePropValue])"
              class="item__checkbox"
              @change="onCheckboxToggle({ ...item, value: item[namePropValue], state: $event })"
            />
            <div class="item__checkbox-text">
              {{ item.name }}
            </div>
          </div>
        </template>
        <template #empty="{ text }">
          <div class="pb-8 px-14">{{ text }}</div>
        </template>
      </ListSearch>
    </div>
    <template v-if="!searchQuery">
      <div class="tree-multiple-list__header" v-show="path.length > 1">
        <div class="tree-multiple-list__back-to-previous" @click="backToPrevious"></div>
        <div class="tree-multiple-list__title">{{ currentParent.name }}</div>
      </div>
      <div class="select__list">
        <div
          class="item"
          v-if="path.length > 1"
          @click="
            onItemClick({
              item: {
                [namePropValue]: currentParent[namePropValue],
                name: currentParent.name,
                children: currentParent.list,
                [namePropDisabled]: currentParent[namePropDisabled]
              },
              event: $event,
              selectNestedInsteadNavigateInto: true
            })
          "
        >
          <Checkbox
            :value="currentParent[namePropValue]"
            :checked="val.some((el) => el[namePropValue] === currentParent[namePropValue] && !currentParent[namePropDisabled])"
            :disabled="currentParent[namePropDisabled]"
            :title="currentParent[namePropDisabled] ? disabledCheckboxTitle : title"
            class="item__checkbox"
            @change="
              onCheckboxToggle({
                value: currentParent[namePropValue],
                name: currentParent.name,
                children: currentParent.list,
                [namePropDisabled]: currentParent[namePropDisabled],
                state: $event
              })
            "
          />
          <div class="item__checkbox-text">Выбрать «{{ currentParent.name }}»</div>
        </div>
        <div
          class="item item_checkbox"
          v-for="item in path[path.length ? path.length - 1 : 0].list"
          :key="item[namePropValue]"
          :class="{ item_nested: hasChild(item), 'item_nested-loading': isActiveLoading && hasChild(item) }"
          @click="onItemClick({ item, event: $event })"
        >
          <Checkbox
            :value="item[namePropValue]"
            :checked="val.some((el) => el[namePropValue] === item[namePropValue] && !item[namePropDisabled])"
            :disabled="item[namePropDisabled]"
            :title="item[namePropDisabled] ? disabledCheckboxTitle : title"
            class="item__checkbox"
            @change="onCheckboxToggle({ ...item, value: item[namePropValue], state: $event })"
          />
          <div class="item__checkbox-text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.css" scoped></style>

<docs>
  Древовидный список с выбором нескольких пунктов:
  ```
  <TreeMultipleList
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
  <TreeMultipleList
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
