<template>
  <div class="bonus-count">
    <template v-if="description">
      <Tooltip v-if="percent" width-tool="285px" class="bonus-count__tooltip">
        <template #handler>
          <div class="bonus-count__percent">{{ percent }}%</div>
        </template>
        <template #content>
          <slot name="desc-percent">Столько процентов от стоимости товара вы получите в виде бонусов</slot>
        </template>
      </Tooltip>
      <Tooltip width-tool="287px" padding="7px 12px 8px" class="bonus-count__tooltip">
        <template #handler>
          <div class="bonus-count__tooltip-head">
            <div class="bonus-count__text">
              {{ count }}
            </div>
            <div class="bonus-count__img" />
          </div>
        </template>
        <template #content>
          <slot name="desc-count">
            <div class="bonus-count__tippy">
              Бонусы за покупку будут начислены на вашу карту.
              <div class="bonus-count__tippy-wrapper">
                <div class="bonus-count__tippy-item">
                  &ndash;
                  <div class="bonus-count__tippy-text">
                    <span>1 <span class="bonus-count__tippy-icon" /> = 1₽</span>
                  </div>
                </div>
                <div class="bonus-count__tippy-item">
                  &ndash;
                  <div class="bonus-count__tippy-text">Оплачивайте <span>полную стоимость покупки</span> бонусами</div>
                </div>
              </div>
            </div>
          </slot>
        </template>
      </Tooltip>
    </template>
    <template v-else>
      <div v-if="percent" class="bonus-count__percent">{{ percent }}%</div>
      <div class="bonus-count__tooltip-head">
        <div class="bonus-count__text">
          {{ count }}
        </div>
        <div class="bonus-count__img" />
      </div>
    </template>
  </div>
</template>

<docs>
 Стандартный вид:
  ```
  <BonusCount :percent="20" :count="105"/>
  ```
 Вид с измененным описанием:
  ```
  <BonusCount :percent="44" :count="2545">
    <template #desc-percent>
      Очень большой процент
    </template>
    <template #desc-count>
      Очень много бонусов
    </template>
  </BonusCount>
  ```
</docs>

<script>
import Tooltip from '@src/components/Tooltip'

export default {
  name: 'BonusCount',
  props: {
    /**
     * Процент
     */
    percent: {
      type: Number,
      default: null
    },
    /**
     * Количество бонусов
     */
    count: {
      type: Number,
      required: true
    },
    /**
     * Активировать ли подсказку Tooltip
     */
    description: {
      type: Boolean,
      default: true
    },
    /**
     * Минимальная сумма
     */
    price: {
      type: Number,
      default: 100
    }
  },
  components: {
    Tooltip
  }
}
</script>

<style lang="postcss" scoped>
.bonus-count {
  position: relative;
  z-index: 2;
  background-color: #ffe803;
  border-radius: 10px;
  max-height: 16px;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 11px;
  margin-right: 10px;
  margin-left: 1px;
  cursor: pointer;
  width: fit-content;
  &__tooltip {
    display: flex;
    text-align: left;
    &-head {
      display: flex;
    }
  }
  &__percent {
    display: flex;
    align-items: center;
    height: 14px;
    background-color: #fff;
    border-radius: 10.5px;
    padding: 0 5px;
    margin-left: 1px;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
  }
  &__text {
    padding-left: 5px;
    line-height: 16px;
    font-size: 11px;
    display: flex;
    align-items: center;
  }
  &__img {
    display: flex;
    align-items: center;
    &:after {
      content: '';
      display: inline-block;
      background-image: svg-load('./icon/bonus-icon.svg');
      background-repeat: no-repeat;
      width: 17px;
      height: 12px;
      margin-left: 3px;
      padding-right: 3px;
    }
  }
  &__tippy {
    width: 262px;
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
    .tippy-content {
      padding: 12px 13px;
    }
    img {
      margin-bottom: -2px;
    }
    span {
      color: #ffe800;
    }
  }
  &__tippy-icon {
    display: inline-block;
    vertical-align: middle;
    margin-top: -1px;
    width: 16px;
    height: 12px;
    background-image: svg-load('./icon/bonus-icon-yellow.svg', fill=#ffe800);
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 16px 12px;
  }
  &__tippy-wrapper {
    width: 215px;
    margin-top: 6px;
  }
  &__tippy-item {
    display: flex;
    margin-bottom: 6px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__tippy-text {
    padding-left: 5px;
  }
}
</style>
