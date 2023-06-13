import {IGood} from "~/interfaces/IGood";

// Инретфейс группы товаров
export interface IGoodGroup {
    id: number
    name: string
    products: IGood[]
}