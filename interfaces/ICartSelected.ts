import {IGood} from "~/interfaces/IGood";

// Интерфейс выбранного товара в корзине 
export interface ICartSelected extends IGood {
    selectedCounts: number;
}