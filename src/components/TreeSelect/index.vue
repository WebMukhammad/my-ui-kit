<template>
  <div
    :class="[
      'tree-select',
      `tree-select_${somethingSelected ? 'selected' : 'placeholder'}`,
      {
        'tree-select_active': isActive,
        'tree-select_error': error,
        'tree-select_disabled': disabled,
        'tree-select_loading': loading
      }
    ]"
  >
    <div class="tree-select__first-row" @click="onSelectClick" ref="select">
      <template v-if="multiple">
        <template v-if="isArray(val)">
          <div class="tree-select__selected-checked">
            <div class="tree-select__selected-checked-item">
              <div class="tree-select__selected-checked-text">
                <slot name="selectedText" :count="val.length">
                  {{ selectedText }}
                </slot>
              </div>
              <div class="icon-close icon-close_brown tree-select__selected-checked-icon" @click="resetMultipleSelect"></div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="tree-select__placeholder">{{ placeholder }}</div>
        </template>
      </template>
      <template v-else>
        <template v-if="val && val[namePropValue]">
          <div class="tree-select__selected">{{ val.name }}</div>
        </template>
        <template>
          <div class="tree-select__placeholder">{{ placeholder }}</div>
        </template>
      </template>
    </div>

    <div class="tree-select__popup" ref="list">
      <div class="tree-select__wrapper">
        <div class="tree-select__scroll-wrapper" ref="scrollWrapper" :style="{ maxHeight: openSelectHeight }">
          <div class="tree-select__row">
            <div>
              <TreeMultipleList
                v-if="multiple"
                :search="search"
                :list="data"
                :value="val"
                :isSelectedChildren="isSelectedChildren"
                :searchAdapter="searchAdapter"
                :emptySearchText="emptySearchText"
                :resetPathOnCloseSelect="isActive"
                :namePropValue="namePropValue"
                :namePropDisabled="namePropDisabled"
                :title="title"
                :disabled-checkbox-title="disabledCheckboxTitle"
                :search-stick-on-scroll="searchStickOnScroll"
                @change="onMultipleTreeListChange"
              />
              <TreeListSelect
                v-else
                :search="search"
                :list="data"
                isClearQuery
                :value="val"
                :namePropValue="namePropValue"
                :searchAdapter="searchAdapter"
                :resetPathOnCloseSelect="isActive"
                @change="onTreeListChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<docs>
  Древовидный селект с поиском:
  ```
  <TreeSelect
    placeholder="Выберите категорию"
    search
    :data="[
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

  Древовидный селект с поиском и возможностью выбрать несколько пунктов:
  ```
  <TreeSelect
    placeholder="Выберите категорию"
    multiple
    search
    :data="[
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

Древовидный селект с поиском и возможностью выбрать несколько пунктов и задизейбленными чекбоксами:
  ```
  <TreeSelect
    placeholder="Выберите категорию"
    multiple
    search
    :data="[
      {
        name: 'Махачкала',
        value: '1',
        disabled: true,
        children: [
          {
            name: 'Питер',
            value: '2',
            children: [
              { name: 'Ижевск', value: '3', disabled: true },
              { name: 'Москва', value: '4' },
              { name: 'Питер', value: '5' }
            ]
          },
          { name: 'Ижевск', value: '6', disabled: true },
          { name: 'Москва', value: '7' },
          { name: 'Ижевск', value: '8', disabled: true },
          { name: 'Москва', value: '9' },
          { name: 'Ижевск', value: '10' },
          { name: 'Москва', value: '11' },
          { name: 'Ижевск', value: '12', disabled: true },
          { name: 'Москва', value: '13' },
          { name: 'Ижевск', value: '14' },
          { name: 'Москва', value: '15' },
          { name: 'Ижевск', value: '16', disabled: true },
          { name: 'Москва', value: '17' },
          { name: 'Ижевск', value: '18' },
          { name: 'Москва', value: '19' },
          { name: 'Казань', value: '20' },
          { name: 'Уфа', value: '21' },
        ]
      },
      { name: 'Ижевск', value: '22', disabled: true },
      { name: 'Москва', value: '23', disabled: true },
      { name: 'Питер', value: '24' },
      { name: 'Казань', value: '25', disabled: true },
      { name: 'Уфа', value: '26' },
    ]"
  />
  ```

</docs>

<script src="./script.js" />

<style src="./style.css" scoped />
