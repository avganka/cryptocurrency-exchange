import { Currency, ExchangeType } from '@/core/types/currency';

export interface CurrencyContextType {
  currencies: Currency[];
  errorText: string | null;
  exchangeType: ExchangeType;
  input: {
    currency: Currency | null;
    amount: number;
    minAmount: number;
    isLoading: boolean;
  };
  output: {
    currency: Currency | null;
    amount: number;
    isLoading: boolean;
  };
}

export const initialState: CurrencyContextType = {
  currencies: [],
  errorText: null,
  exchangeType: 'direct',
  input: {
    currency: null,
    isLoading: false,
    amount: 0,
    minAmount: 0
  },
  output: {
    currency: null,
    amount: 0,
    isLoading: false
  }
};

export type ControlType = 'input' | 'output';

export type Action =
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_ACTIVE_CURRENCY'; payload: { currency: Currency; type: ControlType } }
  | { type: 'SET_AMOUNT'; payload: { amount: number; type: ControlType } }
  | { type: 'SET_TYPE'; payload: ExchangeType }
  | { type: 'SET_MIN_AMOUNT'; payload: number }
  | { type: 'SET_ERROR'; payload: string };

export const currencyReducer = (state: CurrencyContextType, { type, payload }: Action): CurrencyContextType => {
  switch (type) {
    case 'SET_CURRENCIES':
      return { ...state, currencies: payload };
    case 'SET_ACTIVE_CURRENCY':
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          currency: payload.currency
        }
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        [payload.type]: {
          ...state[payload.type],
          amount: payload.amount
        }
      };
    case 'SET_MIN_AMOUNT':
      return {
        ...state,
        input: {
          ...state.input,
          minAmount: payload
        }
      };
    case 'SET_TYPE':
      return {
        ...state,
        exchangeType: payload
      };

    case 'SET_ERROR':
      return { ...state, errorText: payload };
    default:
      return state;
  }
};
