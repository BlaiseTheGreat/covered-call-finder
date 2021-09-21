const express = require('express');
// const cors = require("cors");
const app = express();
const PORT = 5000;

const { fetchBitcoinPrice } = require('./fetchBitcoinPrice');

app.use(express.json());




app.get('/btc', async (req, res) => {
    const btcPrice = await fetchBitcoinPrice();
    res.send(btcPrice);
})

app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => {
    console.log("Server is running on", PORT);
});