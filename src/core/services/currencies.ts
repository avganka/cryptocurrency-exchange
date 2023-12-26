import { APIService } from '.';
import {
  Currency,
  DirectType,
  EstimatedExchangeAmount,
  Flow,
  MinimalExchangeAmount,
  ReverseType
} from '../types/currency';

interface CurrencyParams {
  active?: string;
  flow?: string;
  buy?: string;
  sell?: Flow;
}

interface MinimalExchangeAmountParams {
  fromCurrency: string;
  toCurrency: string;
  fromNetwork?: string;
  toNetwork?: string;
  flow?: Flow;
}

interface CommonExchangeAmountParams {
  fromCurrency: string;
  toCurrency: string;
  fromNetwork?: string;
  toNetwork?: string;
  flow?: Flow;
  useRateId?: string;
}
interface DirectExchangeAmountParams extends CommonExchangeAmountParams {
  fromAmount: string;
  toAmount?: string;
  type: DirectType;
}

interface ReverseExchangeAmountParams extends CommonExchangeAmountParams {
  fromAmount?: string;
  toAmount: string;
  type: ReverseType;
}

type EstimatedExchangeAmountParams = DirectExchangeAmountParams | ReverseExchangeAmountParams;

export class CurrencyService extends APIService {
  public async fetchCurrenciesList(params?: CurrencyParams): Promise<{ currencies: Currency[] }> {
    const response = await this.execute('v2/exchange/currencies', 'GET', {
      params: {
        ...params
      }
    });
    return {
      currencies: response.data
    };
  }

  public async fetchMinimalExchangeAmount({
    fromCurrency,
    toCurrency,
    ...params
  }: MinimalExchangeAmountParams): Promise<{ minimalExchangeAmount: MinimalExchangeAmount }> {
    const response = await this.execute('v2/exchange/min-amount', 'GET', {
      params: {
        fromCurrency,
        toCurrency,
        ...params
      }
    });
    return {
      minimalExchangeAmount: response.data
    };
  }

  public async fetchEstimatedExchangeAmount({
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    type = 'direct',
    ...params
  }: EstimatedExchangeAmountParams): Promise<{ estimatedExchangeAmount: EstimatedExchangeAmount }> {
    const response = await this.execute('v2/exchange/estimated-amount', 'GET', {
      params: {
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount,
        type,
        ...params
      }
    });
    return {
      estimatedExchangeAmount: response.data
    };
  }
}
