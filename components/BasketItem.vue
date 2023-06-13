<script setup lang="ts">
import {ICartSelected} from "~/interfaces/ICartSelected";
import {useGoodsBasket} from "~/composables/goodsInBasket";
import {useSelectedMoney} from "#imports";

const {good} = defineProps<{
  good: ICartSelected;
}>();
const selectedCount = ref(1);
const {removeGood, setCount} = useGoodsBasket();
const {selectedMoney} = useSelectedMoney();

// обновление стомимости ы заваисимости от валюты
function updatePrice(money: number, price: number) {
  return Number((price * money).toFixed(2))

}

// слушатель измения количества товаров
watch(selectedCount, () => {
  // если товаров меньше 1 - удаляем товар из корзины
  if (selectedCount.value < 1) {
    removeGood(good)
  }
  // если выбрали товаров больше чем есть в наличии, не даем увеличить количество
  if (selectedCount.value > good.count) {
    selectedCount.value = good.count;
  } else {
    setCount(selectedCount.value, good.id)
  }
})

</script>

<template>
  <div class="wrap" v-if="good">
    <div class="name_good">{{ good.name }}</div>
    <div class="inputBlock">
      <input class="inputCount" v-model="selectedCount" type="number"/>
    </div>
    <div class="price_block">{{ updatePrice(selectedMoney.value, good.price) }} 
      <span>{{ selectedMoney.name }}/ за шт</span>
    </div>
    <div>
      <button @click="removeGood(good)">Убрать</button>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  border-bottom: 1px #ddd solid;
}

.wrap div {
  padding: 10px;

}

.name_good {
  width: 50%;
}

.inputCount, .price_block {
  width: 80px;
}

.price_block span {
  font-size: 11px;
}

</style>