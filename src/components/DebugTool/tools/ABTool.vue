<template>
  <div>
    <div class="title">Тесты на текущей странице</div>
    <div v-if="needUpdate" class="warning">
      <Button @click="setTestCookie" icon="reset" size="33"> Применить </Button>
      <StatusBlock class="warning__message" type="warning" size="s" title="Страница обновится после применения" />
    </div>
    <div v-if="tests && tests.length" class="table">
      <div class="table-title">
        <div class="table__col">Название теста</div>
        <div class="table__col">Значение</div>
      </div>
      <div v-for="test in tests" :key="test.name" class="table__row">
        <div :title="test.name" class="table__col">{{ test.name }}</div>
        <div class="table__col">
          <select v-model="test.winner" @change="() => (needUpdate = true)" class="table__select">
            <option v-for="value in test.list" :key="value.name" :value="value.name">
              {{ value.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-else class="table_empty">Тестов нет</div>
  </div>
</template>

<script>
import cookie from 'cookie'

import Button from '../../Button'
import StatusBlock from '../../StatusBlock'

export default {
  name: 'ABTool',
  props: {
    tests: {
      type: [Array, null]
    }
  },
  components: {
    Button,
    StatusBlock
  },
  data: () => ({
    needUpdate: false
  }),
  methods: {
    setTestCookie() {
      this.tests.forEach((test) => {
        document.cookie = cookie.serialize(`ab-test-${test.name}`, test.winner, { path: '/', maxAge: 2592000 })
      })

      document.location.reload()
    }
  }
}
</script>

<style lang="postcss" scoped>
.title {
  padding: 4px 20px 8px;
  font-weight: 500;
  font-size: 19px;
  line-height: 21px;
}

.table {
  &-title {
    font-size: 12px;
    line-height: 14px;
    color: #8e8e8e;
    display: flex;
    padding: 3px 20px;
  }

  &__row {
    padding: 6px 20px;
    display: flex;
    font-size: 14px;
    line-height: 21px;
    border-top: 1px solid #202020;
    border-bottom: 1px solid #202020;

    &:nth-child(odd) {
      background: #323232;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  &__row &__col,
  &-title &__col {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__select {
    background: right center/10px 6px url('~@img/icon/arrow-white.svg') no-repeat;
    width: 100%;
    padding-right: 20px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
  }

  &_empty {
    padding: 0 20px 40px;
  }
}

.warning {
  margin: 6px 20px 24px;
  display: flex;
  align-items: center;

  &__message {
    margin: 0 0 0 8px;
  }
}
</style>
