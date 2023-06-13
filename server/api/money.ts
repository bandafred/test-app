// АПИ получения курса валют
export default defineEventHandler(async () => {
    // получение данных по валютам от внешнего АПИ
    return await $fetch('https://api.exchangerate.host/latest?base=USD');
})


