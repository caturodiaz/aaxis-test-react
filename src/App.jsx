import { useState, useEffect } from "react";
import styled from "@emotion/styled";

import CurrencySelector from "./components/CurrencySelector";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 30%;
  @media (max-width: 768px) {
    width: 85%;
  }
`;

const Heading = styled.h1`
  font-family: "Montserrat", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 1rem 0 0.7rem 0;
  font-size: 1.7rem;
  margin-bottom: 3rem;
`;

const Equal = styled.p`
  font-size: 4rem;
  margin: 0;
  display: flex;
  justify-content: center;
  font-weight: 800;
`;

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const getCurrencyData = async () => {
      const urlCurrencies =
        "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_0SHxHtFq50sECZ8FDhVttKfkwL0zQTK2Q7kFYWVC&currencies=EUR%2CUSD%2CCAD%2CCNY";

      const urlLatest = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_0SHxHtFq50sECZ8FDhVttKfkwL0zQTK2Q7kFYWVC&currencies=EUR%2CUSD%2CCAD%2CCNY`;

      const responseCurrencies = await fetch(urlCurrencies);
      const responseLatest = await fetch(urlLatest);

      const resultCurrencies = await responseCurrencies.json();
      const resultLatest = await responseLatest.json();

      Object.keys(resultCurrencies.data).forEach((currencyCode) => {
        resultCurrencies.data[currencyCode].rate =
          resultLatest.data[currencyCode];

        const firstCurrency = Object.keys(resultCurrencies.data)[0];
        setExchangeRate(resultCurrencies.data[firstCurrency].rate);
      });

      const firstCurrency = Object.keys(resultCurrencies.data)[0];

      setCurrencyOptions([...Object.keys(resultCurrencies.data)]);
      setFromCurrency(resultCurrencies.data["USD"].code);
      setToCurrency(firstCurrency);
    };
    getCurrencyData();
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_0SHxHtFq50sECZ8FDhVttKfkwL0zQTK2Q7kFYWVC&currencies=EUR%2CUSD%2CCAD%2CCNY&base_currency=${fromCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.data[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };

  return (
    <>
      <Container>
        <div>
          <Heading>Currency Converter</Heading>

          <CurrencySelector
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />

          <Equal> = </Equal>

          <CurrencySelector
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </div>
      </Container>
    </>
  );
}

export default App;
