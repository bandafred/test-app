<script setup lang="ts">
import {IMoney} from "~/interfaces/IMoney";
import {useSelectedMoney} from "~/composables/selectedMoney";

const state = useSelectedMoney();
const {data: money} = await useAsyncData(() => $fetch('/api/money'))
const moneyAll = reactive<IMoney[]>([]);
let searchResult = reactive<IMoney[]>(moneyAll);
const search = ref('');
const isLoading = computed(() => !money);

// выбор валюты
function setMoney(money: IMoney) {
  state.addSelectedMoney(money);
}

// поиск валюты
function searchMoney() {
  searchResult = [];

  moneyAll.forEach((el: IMoney) => {
    if (el.name?.toLowerCase().includes(search.value?.toLowerCase())) {
      searchResult.push(el);
    }
  });
}

// функция получения катировок валют с интервалом 15 секунд 
function reLoadRate() {
  setInterval(async () => {
    const {data: money} = await useAsyncData(() => $fetch('/api/money'))
  }, 15000)
}

watch(search, (newSearch) => {
  searchMoney();
});

onMounted(() => {
  for (let key in (money.value as any).rates) {
    const moneyItem: IMoney = {
      name: key,
      value: (money.value as any).rates[key]
    }
    moneyAll.push(moneyItem)
  }
  reLoadRate();
})

</script>

<template>
  <div class="wrapper m-3">
    <div v-if="isLoading">Загрузка...</div>
    <div v-else>
      <div class="title">Курсы валют</div>
      <div class="">
        <input
            v-model="search"
            placeholder="поиск"
            class="input m-2"
        />
      </div>
      <div
          v-for="item in searchResult"
          class="money_block m-2"
          @click="setMoney(item)"
          :class="state.selectedMoney.value.name === item.name ? 'active' : ''"
      >
        <span>{{ item.name }}</span> - {{ item.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  border: 2px #ddd solid;
}

.money_block {
  border-bottom: 1px #ddd solid;
  font-size: 14px;
  cursor: pointer;
}

.money_block span {
  font-weight: bold;
  color: #052b4d;
}

.title {
  background: #F19427FF;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
}

.input {
  width: 70px;
  margin: 0;
  padding: 5px;
  border: 1px #ccc solid
}

.active {
  background: #ddd;
}
</style>