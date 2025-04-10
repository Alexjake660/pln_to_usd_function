
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/functions/plnToUsd', async (req, res) => {
  const { input } = req.body;
  const amount = parseFloat(input);

  // if (isNaN(amount)) {
  //   return res.status(400).send({ output: "Invalid input amount" });
  // }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=PLN&to=USD`);
    const data = await response.json();
    const usdAmount = data.rates?.USD;

    res.send({ output: usdAmount });
  } catch (err) {
    res.status(500).send({ output: "Error fetching exchange rate" });
  }
});

app.get('/functions/plnToUsd', (req, res) => {
  res.send({
    name: "plnToUsd",
    description: "Convert Polish Zloty (PLN) to US Dollars (USD)",
    input: {
      type: "number",
      description: "Amount in PLN to convert to USD",
      example: 100
    },
    output: {
      type: "number",
      description: "Equivalent amount in USD",
      example: 25.17
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
