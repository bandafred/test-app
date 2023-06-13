import type {Ref} from 'vue'
import {IMoney} from "~/interfaces/IMoney";

// Метод выбора валюты
export const addSelectedMoney = (selectedMoney: Ref<IMoney>) => (money: IMoney) => selectedMoney.value = money;

export const useSelectedMoney = () => {

    // выбранная валюта
    const getSelectedMoney = useState('selectedMoney', () => ({
        name: 'USD',
        value: 1
    }))
    return {
        selectedMoney: getSelectedMoney,
        addSelectedMoney: addSelectedMoney(getSelectedMoney)
    }
}