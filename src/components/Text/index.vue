<template>
  <div></div>
</template>

<docs>
  Все иконки в проекте
  ```[import](./icons/icons.vue)
  ```

  H1 заголовок:
  ```
  <h1 class="h1">H1 заголовок</h1>
  ```

  H2 заголовок:
  ```
  <h2 class="h2">H2 заголовок</h2>
  ```

  H3 заголовок:
  ```
  <h3 class="h3">H3 заголовок</h3>
  ```

  H4 заголовок:
  ```
  <h4 class="h4">H4 заголовок</h4>
  ```

  H5 заголовок:
  ```
  <h5 class="h5">H5 заголовок</h5>
  ```

  Обычный параграф:
  ```
  <p class="p">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать
    несколько абзацев более менее осмысленного текста рыбы на русском языке, а
    начинающему оратору отточить навык публичных выступлений в домашних
    условиях. При создании генератора мы использовали небезизвестный
    универсальный код речей. Текст генерируется абзацами случайным образом от
    двух до десяти предложений в абзаце, что позволяет сделать текст более
    привлекательным и живым для визуально-слухового восприятия.
  </p>
  ```

  Курсивное начертание текста:
  ```
  <p class="p italic">Курсивный текст</p>
  ```

  Стандартный вид ссылки
  ```
  <a href="#0" class="link link_black fz-14">Ссылка</a>
  ```

  Красный цвет ссылки:
  ```
  <a href="#0" class="link link_red fz-14">Ссылка</a>
  ```

  Синий цвет ссылки:
  ```
  <a href="#0" class="link link_blue fz-14">Ссылка</a>
  ```

  Зеленый цвет ссылки:
  ```
  <a href="#0" class="link link_green fz-14">Ссылка</a>
  ```

  Серый цвет ссылки:
  ```
  <a href="#0" class="link link_grey fz-14">Ссылка</a>
  ```

  Ссылка с пунктирным подчеркиванием:
  ```
  <a href="#0" class="link link_black link_dashed fz-14">Ссылка</a>
  ```

  Все ссылки с иконками
  ```[import](./links/links.vue)
  ```

    зеленая сcылка с иконкой:
  ```
  <a href="#0" class="link-icon link-icon_green link-icon_dashed fz-14">
    <div class="link-icon__icon-card"></div>
    <div class="link-icon__text">Ссылка</div>
  </a>
  ```

  Ссылка без подчеркивания
  ```
  <a href="#0" class="link link_black link_wu fz-14">Ссылка</a>
  ```

  Список:
  ```
  <div class="p">
    <ul class="dash-list">
      <li class="dash-list__item">Первый пункт списка, Первый пункт списка</li>
      <li class="dash-list__item">Второй пункт списка, Второй пункт списка</li>
      <li class="dash-list__item">Третий пункт списка, Третий пункт списка</li>
    </ul>
  </div>
  ```

  Список:
  ```
  <div class="p">
    <ul class="bullet-list">
      <li class="bullet-list__item">Первый пункт списка, Первый пункт списка</li>
      <li class="bullet-list__item">Второй пункт списка, Второй пункт списка</li>
      <li class="bullet-list__item">Третий пункт списка, Третий пункт списка</li>
    </ul>
  </div>
  ```

  Список:
  ```
  <div class="p">
    <ul class="numeric-list">
      <li class="numeric-list__item">Первый пункт списка, Первый пункт списка</li>
      <li class="numeric-list__item">Второй пункт списка, Второй пункт списка</li>
      <li class="numeric-list__item">Третий пункт списка, Третий пункт списка</li>
    </ul>
  </div>
  ```

  Трансформация HTML-тегов через стили без классов, подходит для различныз WYSIWYG:
  ```
  <div class="inner-tag-transform">
    <h1>H1 заголовок</h1>
    <p>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <h2>H2 заголовок</h2>
    <p>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <h3>H3 заголовок</h3>
    <p>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <h4>H4 заголовок</h4>
    <p>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <h5>H5 заголовок</h5>
    <p>Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <p><a href="#0">Ссылка</a> Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, 
    а начинающему оратору отточить навык публичных</p>
    <h4>OL список</h4>
    <ol>
      <li>Первый пункт списка, Первый пункт списка</li>
      <li>Второй пункт списка, Второй пункт списка</li>
      <li>Третий пункт списка, Третий пункт списка</li>
    </ol>
    <h4>UL список</h4>
    <ul>
      <li>Первый пункт списка, Первый пункт списка</li>
      <li>Второй пункт списка, Второй пункт списка</li>
      <li>Третий пункт списка, Третий пункт списка</li>
    </ul>
  </div>
  ```

  Обрезка до одной строки:
  ```
  <p class="p p_crop-1">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
  </p>
  ```

  Обрезка до двух строк:
  ```
  <p class="p p_crop-2">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
  </p>
  ```

  Обрезка до трех строк:
  ```
  <p class="p p_crop-3">
    Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.
  </p>
  ```

  Перечеркнутый текст:
  ```
  <div class="crossed fs-22">14 500Р</div>
  ```

  Перечеркнутый красный текст:
  ```
  <div class="crossed crossed_red fs-22">14 500Р</div>
  ```

  Серый текст:
  ```
  <p class="p grey-text">Серый текст</p>
  ```

  Зеленый текст:
  ```
  <p class="p green-text">Зеленый текст</p>
  ```

  Красный текст:
  ```
  <p class="p red-text">Красный текст</p>
  ```

  Синий текст:
  ```
  <p class="p blue-text">Синий текст</p>
  ```

  Желтый текст:
  ```
  <p class="p yellow-text">Желтый текст</p>
  ```

  Тёмно-желтый текст:
  ```
  <p class="p dark-yellow-text">Тёмно-желтый текст</p>
  ```
</docs>

<script>
/**
 * Это не конкретный компонент, скорее сборка различных универсальных БЭМ-блоков, связанных с текстом
 */
export default {
  name: 'TextVariant'
}
</script>

<style lang="postcss">
.icons-grid {
  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  &__col {
    margin-right: 20px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &_black {
      background-color: #000;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__item {
    margin-bottom: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.links-grid {
  &__row {
    display: flex;
    justify-content: space-between;
  }
}

.h1,
.inner-tag-transform h1 {
  font-weight: 500;
  font-size: 47px;
  line-height: 55px;
  &_mb {
    margin-bottom: 18px;
  }
}
.h2,
.inner-tag-transform h2 {
  font-weight: 500;
  font-size: 37px;
  line-height: 39px;
  &_mb {
    margin-bottom: 14px;
  }
}
.h3,
.inner-tag-transform h3 {
  font-weight: 500;
  font-size: 29px;
  line-height: 31px;
  &_mb {
    margin-bottom: 10px;
  }
}
.h4,
.inner-tag-transform h4 {
  font-weight: 500;
  font-size: 22px;
  line-height: 24px;
  &_mb {
    margin-bottom: 8px;
  }
}
.h5,
.inner-tag-transform h5 {
  font-weight: 500;
  font-size: 19px;
  line-height: 21px;
  &_mb {
    margin-bottom: 6px;
  }
}

.italic {
  font-style: italic;
}

.b,
.inner-tag-transform b {
  font-weight: 500;
}

/* Paragraf */
.p,
.inner-tag-transform p {
  font-size: 14px;
  line-height: 21px;
  &_crop {
    &-1 {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    &-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow-y: hidden;
    }
    &-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow-y: hidden;
      text-overflow: ellipsis;
    }
  }
}

/* Links */
.link,
.inner-tag-transform a {
  border-bottom: 1px solid #e0e0e0;
  text-decoration: none;
  color: #000;
  border-bottom-color: rgba(0, 0, 0, 0.12);
  cursor: pointer;
  &:hover {
    color: #eb0010;
    border-bottom-color: rgba(228, 49, 55, 0.25);
  }
  @each $modifier, $color, $border, $color_hover, $border_hover in (red, blue, green, grey), (#eb0010, #2b5ead, #22a767, #818181),
    (rgba(235, 0, 16, 0.22), rgba(43, 94, 173, 0.33), rgba(34, 167, 103, 0.27), rgba(0, 0, 0, 0.15)), (#a9000c, #093a85, #0a7c45, #474747),
    (rgba(169, 0, 11, 0.35), rgba(43, 94, 173, 0.45), rgba(34, 167, 103, 0.42), rgba(0, 0, 0, 0.22))
  {
    &_$(modifier) {
      color: $(color);
      border-bottom-color: $(border);
      &:hover {
        color: $(color_hover);
        border-bottom-color: $(border_hover);
        transition: color 0.2s ease-out, border-bottom-color 0.2s ease-out;
      }
    }
  }
  &_dashed {
    border-bottom-style: dashed;
  }
  &_wu {
    border-bottom: none;
  }
  &_bonuses {
    background: linear-gradient(to right, #ea1414, #7004a7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    &::selection {
      -webkit-text-fill-color: #ea1414;
    }
  }
}

.link-icon {
  color: #000;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  &__text {
    display: inline;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  &_dashed {
    ^&__text {
      border-bottom-style: dashed;
    }
  }
  &_wu {
    ^&__text {
      border-bottom: 0px;
    }
  }

  &:hover {
    color: #eb0010;
    transition: color 0.2s ease-out;
    ^&__text {
      border-bottom-color: rgba(228, 49, 55, 0.25);
      transition: border-bottom-color 0.2s ease-out;
    }
  }
  @each $icon in (card, login, lock, cart, warning, comment, bug, bin, top-arrow, right-arrow, bottom-arrow, left-arrow) {
    &__icon-$(icon) {
      width: 16px;
      height: 16px;
      margin-right: 2px;
      background-image: svg-load('./icon/$(icon).svg', fill=#000);
      background-position: center;
      background-size: 16px;
      background-repeat: no-repeat;
      display: inline-block;
      vertical-align: top;
      position: relative;
      top: -1px;
    }
    &__icon-top-arrow {
      width: 8px;
      background-size: 8px;
      margin-right: 0px;
    }
    &__icon-right-arrow {
      width: 8px;
      background-size: 5px;
      margin-right: 0px;
    }
    &__icon-bottom-arrow {
      width: 8px;
      background-size: 8px;
      margin-right: 0px;
    }
    &__icon-left-arrow {
      width: 8px;
      background-size: 5px;
      margin-right: 0px;
    }
    &__icon-cart {
      background-size: 15px;
    }
    &__icon-bin {
      background-size: 15px;
    }
    &:hover {
      ^&__icon-$(icon) {
        background-image: svg-load('./icon/$(icon).svg', fill=#eb0010);
        transition: background-image 0.2s ease-out;
      }
    }
    @each $modifier, $color, $border, $background, $color_hover, $border_hover in (red, blue, green, grey, white),
      (#eb0010, #2b5ead, #22a767, #818181, #ffffff),
      (rgba(235, 0, 16, 0.22), rgba(43, 94, 173, 0.33), rgba(34, 167, 103, 0.27), rgba(0, 0, 0, 0.15), transparent),
      (#b5000d, #0d3b83, #0a874b, #545454, #ffffff), (#a9000c, #093a85, #0a7c45, #474747, #ffffff),
      (rgba(169, 0, 11, 0.35), rgba(43, 94, 173, 0.45), rgba(34, 167, 103, 0.42), rgba(0, 0, 0, 0.22), transparent)
    {
      &_$(modifier) {
        color: $(color);
        .link-icon__icon-$(icon) {
          background-image: svg-load('./icon/$(icon).svg', fill= '$(color)');
        }
        .link-icon__text {
          border-bottom-color: $(border);
        }
        &:hover {
          .link-icon__icon-$(icon) {
            background-image: svg-load('./icon/$(icon).svg', fill= '$(background)');
            transition: background-image 0.2s ease-out;
          }
          .link-icon__text {
            color: $(color_hover);
            border-bottom-color: $(border_hover);
            transition: color 0.2s ease-out, border-bottom-color 0.2s ease-out;
          }
        }
      }
    }
  }
}

.inner-tag-transform {
  font-size: 14px;
  line-height: 19px;
  > *:first-child {
    margin-top: 0;
  }
  h1 {
    margin-bottom: 15px;
  }
  h2 {
    margin-top: 22px;
    margin-bottom: 14px;
  }
  h3 {
    margin-top: 19px;
    margin-bottom: 8px;
  }
  h4 {
    margin-top: 10px;
    margin-bottom: 3px;
  }
  h5 {
    margin-top: 9px;
  }
  p {
    margin-top: 8px;
  }
  @media (max-width: 800px) {
    h1 {
      margin-bottom: 15px;
    }
    h2 {
      margin-top: 21px;
      margin-bottom: 13px;
    }
    h3 {
      margin-bottom: 7px;
    }
  }
  sup {
    vertical-align: super;
  }
  img {
    max-width: 100%;
    border-radius: 4px;
  }
  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
    td {
      vertical-align: top;
    }
    thead td {
      padding: 5px 10px 9px 0;
      border-bottom: 2px solid #636363;
      font-weight: 500;
    }
    tbody td {
      min-height: 35px;
      padding: 8px 10px 8px 0;
      border-bottom: 1px solid #f2f2f2;
    }
  }
}

/* Lists */
.dash-list,
.inner-tag-transform ul {
  padding-left: 13px;
  list-style-type: none;
}

.dash-list__item,
.inner-tag-transform ul li {
  margin-bottom: 7px;
  text-indent: -13px;
  &:last-child {
    margin-bottom: 0;
  }
  &:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 1px;
    margin-right: 7px;
    background-color: #000;
    vertical-align: middle;
  }
}

.bullet-list {
  padding-left: 12px;
  list-style-type: none;
  &__item {
    margin-bottom: 7px;
    text-indent: -12px;
    &:last-child {
      margin-bottom: 0;
    }
    &:before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 4px;
      margin-right: 8px;
      border-radius: 50%;
      background-color: #000;
      vertical-align: middle;
    }
  }
}

.numeric-list,
.inner-tag-transform ol {
  padding-left: 25px;
  list-style-type: decimal;
}

.numeric-list__item,
.inner-tag-transform ol li {
  margin-bottom: 7px;
  &:last-child {
    margin-bottom: 0;
  }
}

/* Crossed-text  */
.crossed {
  position: relative;
  display: inline-block;
  &:before {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    left: 1px;
    transform: rotate(-9deg);
    width: 100%;
    height: 1px;
    background-color: #000;
  }
  &_red {
    color: #eb0010;
    &:before {
      background-color: #eb0010;
    }
  }
  &_dark-yellow {
    color: #5e5118;
    &:before {
      background-color: #5e5118;
    }
  }
}

/* Text-color */
.blue-text {
  color: #2b5ead;
}
.dark-yellow-text {
  color: #5e5118;
}
.green-text {
  color: #22a767;
}
.grey-text {
  color: #818181;
}
.red-text {
  color: #eb0010;
}
.yellow-text {
  color: #bb8300;
}
.yellowish {
  background-color: #fffae5;
}

.fs {
  &-12 {
    font-size: 12px;
    line-height: 18px;
  }
  &-14 {
    font-size: 14px;
    line-height: 16px;
  }
  &-22 {
    font-size: 22px;
    line-height: 21px;
  }
}
</style>
