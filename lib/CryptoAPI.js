const axios = require("axios");
const colors = require("colors");

class CryptoAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.nomics.com/v1/currencies/ticker";
    }

    async getPriceData(coin, cur) {
        try {
            //formatter for currency
            const formatter = new Intl.NumberFormat("enUS", {
                style: "currency",
                currency: cur,
            });
            const res = await axios.get(
                `${this.baseUrl}?key=${this.apiKey}&ids=${coin}&convert=${cur}`
            );
            let output = "";

            res.data.forEach((el) => {
                output += `Coin: ${el.symbol.yellow} (${el.name}) | Price: ${
                    formatter.format(el.price).green
                } | Rank: ${el.rank.blue}\n`;
            });
            return output;
        } catch (err) {
            handleAPIError(err);
        }
    }
}

function handleAPIError(err) {
    if (err.response.status === 401) {
        throw new Error("Your API Key is Invalid -- Go to https://nomics.com");
    } else if (err.response.status === 404) {
        throw new Error("API Not responding");
    } else {
        throw new Error("Something is not Working");
    }
}

module.exports = CryptoAPI;
