import type {Ref} from 'vue'
import {ICartSelected} from "~/interfaces/ICartSelected";
import {IGood} from "~/interfaces/IGood";

// Метод добавление товара в корзину
export const addGood = (goodsBasket: Ref<ICartSelected[]>) => (payload: IGood) => {
    const good = goodsBasket.value.find(el => el.id === payload.id);

    if (good) {
        goodsBasket.value = goodsBasket.value.filter((el: ICartSelected) => el.id !== payload.id)
    } else {
        const newProduct: ICartSelected = {
            ...payload,
            selectedCounts: 1
        }
        goodsBasket.value.push(newProduct)
    }
};

// метод удаления товара из корзины
export const removeGood = (goodsBasket: Ref<ICartSelected[]>) => (payload: IGood) => {
    goodsBasket.value = goodsBasket.value.filter(el => el.id !== payload.id);
};

// метод измения количества товаров
export const setCount = (goodsBasket: Ref<ICartSelected[]>) => (seCountGppds: number, id: number) => {
    const good = goodsBasket.value.find(x=>x.id === id);
    if (good){
        good.selectedCounts = seCountGppds;
    }
}; 

export const useGoodsBasket = () => {
    const getGoodsBasket = useState('goodsBasket', () => ([]))

    return {
        addGood: addGood(getGoodsBasket),
        removeGood: removeGood(getGoodsBasket),
        setCount: setCount(getGoodsBasket),
        getGoods: getGoodsBasket
    }
}