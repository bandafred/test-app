<script setup lang="ts">
import {IGood} from "~/interfaces/IGood";
import {useSelectedMoney} from "~/composables/selectedMoney";
import {useGoodsBasket} from "~/composables/goodsInBasket";

const state = useSelectedMoney();
const {addGood, getGoods} = useGoodsBasket()

// пропсы
const {products} = defineProps<{
  products: IGood[];
}>();

// выбран ли данный тоавар
function isSelectedGood(item: IGood) {
  return getGoods.value.find((el: IGood) =>
      el.id === item.id
  )
}

// добавление/удалени товара из корзины
function addOrRemoveGood(product: IGood) {
  addGood(product);
}

// обновление стоимости товаров
function updatePrice(money: number, price: number) {
  return Number((price * money).toFixed(2))
}

</script>

<template>
  <div>
    <div v-for="item in products" :key="item.id">
      <div class="block" @click="addOrRemoveGood(item)" :class="isSelectedGood(item) ? 'active': ''">
        <div>{{ item.name }} ({{ item.count }})</div>
        <div class="price" v-if="state.selectedMoney.value">
          {{ updatePrice(state.selectedMoney.value.value, item.price) }}
          <span>{{ state.selectedMoney.value.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.block {
  display: flex;
  border-bottom: 1px #ddd solid;
  justify-content: space-between;
  cursor: pointer;
}

.block div {
  padding: 10px 20px;
}

.block div.price {
  background: #ddd;
  min-width: 150px;
  text-align: center;
  padding: 10px 0;
}

.price span {
  font-size: 11px;
}

.active {
  background: rgb(38, 230, 115)
}

.active div.price {
  background: rgb(38, 230, 115);
}
</style>