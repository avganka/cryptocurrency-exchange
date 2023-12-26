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

export interface CurrenciesUrlParams {
  fromCurrency: string | null;
  toCurrency: string | null;
  fromAmount: string | null;
}

export enum ControlTypes {
  INPUT = 'input',
  OUTPUT = 'output'
}

export type Flow = 'standard' | 'fixed-rate';
