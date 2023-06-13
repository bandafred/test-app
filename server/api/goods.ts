import names from '@/data/names.json';
import data from '@/data/data.json';
import _ from "lodash";
import {IGoodGroup} from "../../interfaces/IGoodGroup";

// Имитация получения данных по АПИ
export default defineEventHandler(():IGoodGroup[] => {
    // метод парсинга моделей 
    return _.map(names, (item: any, index: number) => {
        // получение шрупп товаров
        const goodsGroup = data.Value.Goods.filter((x: any) => x.G == index);
        
        // заполне модели с товарами
        const products = _.map(goodsGroup, (x: any) => ({
            id: x.T,
            name: item.B[x.T].N,
            price: x.C,
            count: x.P,
        }));

        return {
            id: index,
            name: item.G,
            products: products
        }
    })
})