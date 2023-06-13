<script setup lang="ts">
import {IGoodGroup} from "~/interfaces/IGoodGroup";
import GoodItems from "~/components/GoodItems.vue";

// получение товаров по АПИ (имитация)
const {data: goods} = await useAsyncData(() => $fetch('/api/goods'))

</script>

<template>
  <div>
    <div
        v-for="group in goods as IGoodGroup[]"
        :key="group.id"
        class="m-3"
    >
      <div v-if="group.products.length">
        <div class="title">{{ group.name }}</div>
        <div>
          <GoodItems :products="group.products"></GoodItems>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  background: #002877;
  font-size: 20px;
  color: #ffffff;
  padding: 10px 20px;
}

.padding {
  margin: 20px;
}
</style>