export async function getExchangeRates(baseCurrency = 'USD') {
  const res = await fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${baseCurrency}`);
  const data = await res.json();
  return data.data.rates;
}
