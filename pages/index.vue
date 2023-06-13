<template>
  <div class="wrap">
    <div class="goods_block">
      <GoodsBlock/>
    </div>
    <div class="right_block">
      <BasketBlock></BasketBlock>
      <Money></Money>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
}

.goods_block {
  width: 65%;
}

.right_block {
  width: 35%;
}
</style>