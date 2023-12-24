export interface Currency {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
  network: string;
  tokenContract: string | null;
  buy: boolean;
  sell: boolean;
  legacyTicker: string;
}

export interface MinimalExchangeAmount {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  flow: string;
  minAmount: number;
}

export interface EstimatedExchangeAmount {
  fromCurrency: string;
  fromNetwork: string;
  toCurrency: string;
  toNetwork: string;
  flow: string;
  type: string;
  rateId: string;
  validUntil: string;
  transactionSpeedForecast: string | null;
  warningMessage: string | null;
  depositFee: number;
  withdrawalFee: number;
  userId: string | null;
  fromAmount: number;
  toAmount: number;
}

export type Flow = 'standard' | 'fixed-rate';

export type ExchangeType = DirectType | ReverseType;
export type DirectType = 'direct';
export type ReverseType = 'reverse';
