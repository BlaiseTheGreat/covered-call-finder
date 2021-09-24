const express = require('express');
const keys = require("./keys");
// const cors = require("cors");
const app = express();
const PORT = 5000;
const axios = require('axios');
const { tickers, shortList } = require("./sp500Tickers");
const { TD_KEY } = require("./keys");
const { fetchBitcoinPrice } = require('./fetchBitcoinPrice');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))




app.get('/btc', async (req, res) => {
    const btcPrice = await fetchBitcoinPrice();
    res.send(btcPrice);
})


/////////////////////////////////////////////////////////////////////////////



function makeAPICall(id, ticker = 'GME') {
    const response = axios.get('https://api.tdameritrade.com/v1/marketdata/chains', {
        params: {
            id: id,
            apikey: TD_KEY,
            symbol: ticker,
            contractType: 'CALL',
            strikeCount: 1,
            fromDate: '2021-09-29',
            toDate: '2021-10-02'
        }
    });
    return response;
}


app.get('/all', async (req, res) => {
    // console.log('in all');
    try {
        let output = [];
        for (let i = 0; i < tickers.length; i++) { //tickers.length
            const response = await makeAPICall(i+1, tickers[i]);
            const date = Object.keys(response.data.callExpDateMap)[0];
            const dateData = response.data.callExpDateMap[date];
            if (dateData) {
                const ticker = tickers[i];
                const underlyingPrice = response.data.underlyingPrice;
                const closestStrikePrice = Object.keys(dateData)[0];
                const last = dateData[`${closestStrikePrice}`][0].last;
                const ccRatio = last / underlyingPrice * 100;
                const description = dateData[`${closestStrikePrice}`][0].description;

                output.push({
                    ticker: ticker,
                    underlyingPrice: underlyingPrice.toFixed(2),
                    closestStrikePrice: closestStrikePrice,
                    last: last,
                    ccRatio: ccRatio.toFixed(2),
                    description: description
                });
            } else {
                // do nothing because no weekly call for this stock
            }

            console.log('finished: ', i);
            if (i !== 0 && i % 50 === 0) { //TODO , GET BETTER RATE LIMITING IDIOT
                await new Promise(r => setTimeout(r, 20000));
            }



        } // end of for loop

        output.sort((a, b) => b.ccRatio - a.ccRatio);
        for(let i = 0; i < output.length; i++) {
            output[i].rank = i+1;
        }
        res.send(output);

    } catch (e) {
        console.log(e);
    }

})



/////////////////////////////////////////////////////////////////////////



app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});