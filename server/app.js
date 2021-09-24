const express = require('express');
const keys = require("./keys");
// const cors = require("cors");
const app = express();
const PORT = 5000;
const axios = require('axios');


const { fetchBitcoinPrice } = require('./fetchBitcoinPrice');

app.use(express.json());




app.get('/btc', async (req, res) => {
    const btcPrice = await fetchBitcoinPrice();
    res.send(btcPrice);
})


/////////////////////////////////////////////////////////////////////////////

const { TD_KEY } = require("./keys");
const firstHalfURL =        'https://api.tdameritrade.com/v1/marketdata/chains?apikey=';
const contractTypeString = '&contractType=';
const strikeCountString = '&strikeCount=';
const toDateString = '&toDate=';
const toDate = '2021-10-02';
const fromDateString = '&fromDate=';
const fromDate = '2021-09-29'
const contractType = 'CALL';
const strikeCount = 1;

function makeWeekOutURL(ticker) {
    return firstHalfURL + TD_KEY + '&symbol=' + ticker + contractTypeString + contractType + strikeCountString + strikeCount + fromDateString + fromDate + toDateString + toDate;
}

const { tickers } = require("./sp500Tickers");



app.get('/all', async (req, res) => {
    console.log('in all');
    try {
        let output = [];
        for (let i = 0; i < 10; i++) { //tickers.length
            const response = await axios.get(makeWeekOutURL(tickers[i]));
            const dateData = response.data.callExpDateMap['2021-10-01:8']; // TODO THIS IS HARDCODED!~!~!~! :(
            if (dateData) {
                const ticker = tickers[i];
                const underlyingPrice = response.data.underlyingPrice;
                const closestStrikePrice = Object.keys(dateData)[0];
                const last = dateData[`${closestStrikePrice}`][0].last;
                const ccRatio = last / underlyingPrice * 100;
                const description = dateData[`${closestStrikePrice}`][0].description;

                output.push({
                    ticker: ticker,
                    underlyingPrice: underlyingPrice,
                    closestStrikePrice: closestStrikePrice,
                    last: last,
                    ccRatio: ccRatio,
                    description: description
                });
            } else {
                // do nothing because no weekly call for this stock
            }

            console.log('finished: ', i);
            if(i !== 0 && i%50 === 0) { //TODO , GET BETTER RATE LIMITING IDIOT
                await new Promise(r => setTimeout(r, 20000));
            }



        } // end of for loop
        
        output.sort((a, b) => b.ccRatio - a.ccRatio);
        res.send(output);

    } catch (e) {
        console.log(e);
    }

})



/////////////////////////////////////////////////////////////////////////

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});