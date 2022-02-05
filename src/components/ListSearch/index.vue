<template>
  <div class="list-search">
    <label :class="['list-search__header', { 'list-search__header_sticky': searchStickOnScroll }]" :style="{ padding: inputPadding }">
      <input
        type="text"
        class="list-search__input"
        placeholder="Поиcк по списку"
        v-model="searchQuery"
        ref="search"
        @input="onInput"
        @focus="onFocus"
      />
      <div class="list-search__input-icon list-search__input-icon_left"></div>
      <div v-if="isActiveLoading" class="list-search__input-icon list-search__input-icon_right"></div>
    </label>
    <template v-if="searchQuery">
      <div v-if="searchResult && searchResult.length" class="list-search__list">
        <div v-for="(el, index) in searchResult" :key="index" @click="onItemClick(el)">
          <slot :item="el">
            <div class="search-item">
              {{ el.name }}
            </div>
          </slot>
        </div>
      </div>
      <div class="list-search__empty-search p" v-else-if="!isActiveLoading">
        <slot name="empty" :text="emptySearchText">
          {{ emptySearchText }}
        </slot>
      </div>
    </template>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.css" scoped></style>

<docs>
  Кастомизация результатов через слот:
  ```
  <ListSearch
    :list="[
      { name: 'Ижевск', value: '22' },
      { name: 'Москва', value: '23' },
      { name: 'Питер', value: '24' },
      { name: 'Казань', value: '25' },
      { name: 'Уфа', value: '26' },
    ]"
  />
  ```

  Кастомизация результатов через слот:
  ```
  <ListSearch
    :list="[
      { name: 'Ижевск', value: '22' },
      { name: 'Москва', value: '23' },
      { name: 'Питер', value: '24' },
      { name: 'Казань', value: '25' },
      { name: 'Уфа', value: '26' },
    ]"
    v-slot:default="{ item }"
  >
    {{ item.name }} - 123
  </ListSearch>
  ```
</docs>
