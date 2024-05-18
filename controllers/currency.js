const axiosService = require("../utils/axios");
const { CURRENCY_KEY } = require("../utils/constants");

const getTodayCurrencyRate = async () => {
    const url =
        "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

    const response = await axiosService.get(url);

    const currencyRate = response.data.find(
        (currencyRateInfo) => currencyRateInfo.ccy === CURRENCY_KEY
    );

    return {
        currency: CURRENCY_KEY,
        buy: currencyRate.buy,
        sale: currencyRate.sale,
    };
};

module.exports = { getTodayCurrencyRate };
