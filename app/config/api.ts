export const API_BASE_URL = 'https://api.coinbase.com/v2';

export const API_ENDPOINTS = {
  EXCHANGE_RATES: `${API_BASE_URL}/exchange-rates`,
} as const;

export const API_PARAMS = {
  DEFAULT_CURRENCY: 'USD',
  DEFAULT_CRYPTO: 'BTC',
} as const; 