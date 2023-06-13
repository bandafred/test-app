<script setup lang="ts">
import {useGoodsBasket} from "~/composables/goodsInBasket";
import {useSelectedMoney} from "#imports";
import {ICartSelected} from "~/interfaces/ICartSelected";

const {getGoods} = useGoodsBasket()
const {selectedMoney} = useSelectedMoney();

// вычисленние общей стоимости товаров
const totalSumForAllGoods = computed(() => {
  let sum = 0;
  const rate = selectedMoney.value.value;
  getGoods.value.forEach((x: ICartSelected) => {
    sum += rate* x.price * x.selectedCounts;
  })

  return sum.toFixed(2);
});

</script>

<template>
  <div class="wrapper m-3">
    <div class="title">Корзина</div>
    <div v-if="!getGoods.length" class="empty_goods">В корзине пока ничего нет</div>
    <div v-else>
      <div>
        <BasketItem v-for="good in getGoods" :key="good.id" :good="good"></BasketItem>
      </div>
      <div class="total_block" v-if="getGoods.length">
        <span>Общая стоимость товаров:</span> {{ totalSumForAllGoods }} <span>{{ selectedMoney.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 1px #ddd solid
}

.title {
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  background: #186505;
  color: #fff;
}

.total_block {
  padding: 10px;
  font-size: 18px;
  text-align: right;
}

.total_block span {
  font-size: 11px;
}

.empty_goods {
  padding: 10px;
  text-align: center;
}</style>