export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  toUsd: number | null;
  toBTC: number | null;
}

export interface ExchangeRates {
  data: {
    currency: string;
    rates: {
      [key: string]: string;
    };
  };
}

export interface TopCrypto {
  id: string;
  name: string;
}

export const TOP_CRYPTOS: TopCrypto[] = [
  { "id": "BTC", "name": "Bitcoin" },
  { "id": "ETH", "name": "Ethereum" },
  { "id": "USDT", "name": "Tether" },
  { "id": "XRP", "name": "Ripple" },
  { "id": "SOL", "name": "Solana" },
  { "id": "USDC", "name": "USD Coin" },
  { "id": "DOGE", "name": "Dogecoin" },
  { "id": "ADA", "name": "Cardano" },
  { "id": "AVAX", "name": "Avalanche" },
  { "id": "MATIC", "name": "Polygon" }
]; 