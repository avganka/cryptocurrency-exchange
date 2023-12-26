/* eslint-disable no-case-declarations */
import { CurrenciesUrlParams, Currency } from '@/core/types/currency';

export interface CurrencyContextType {
  currencies: Currency[];
  errorText: string | null;
  input: {
    currency: Currency | null;
    amount: string;
    minAmount: string;
    isLoading: boolean;
    errorText: string | null;
  };
  output: {
    currency: Currency | null;
    amount: string;
    minAmount: string;
    isLoading: boolean;
    errorText: string | null;
  };
}

export const initialState: CurrencyContextType = {
  currencies: [],
  errorText: null,
  input: {
    currency: null,
    isLoading: false,
    errorText: null,
    amount: '',
    minAmount: ''
  },
  output: {
    currency: null,
    amount: '',
    isLoading: false,
    errorText: null,
    minAmount: ''
  }
};

export type ControlType = 'input' | 'output';

export type Action =
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_ACTIVE_CURRENCY'; payload: { currency: Currency; type: ControlType } }
  | { type: 'SWITCH_CURRENCIES' }
  | { type: 'SET_AMOUNT'; payload: { amount: string; type: ControlType } }
  | { type: 'SET_LOADING'; payload: { loading: boolean; type: ControlType } }
  | { type: 'UPDATE_FILTERS'; payload: Record<string, string> | CurrenciesUrlParams }
  | { type: 'SET_MIN_AMOUNT'; payload: string }
  | { type: 'SET_CURRENCY_ERROR'; payload: { error: string; type: ControlType } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERRORS' };

// eslint-disable-next-line complexity
export const currencyReducer = (state: CurrencyContextType, action: Action): CurrencyContextType => {
  switch (action.type) {
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payload };
    case 'SET_ACTIVE_CURRENCY':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          currency: action.payload.currency
        }
      };
    case 'SWITCH_CURRENCIES':
      return {
        ...state,
        input: {
          ...state.input,
          currency: state.output.currency
        },
        output: {
          ...state.output,
          currency: state.input.currency
        }
      };
    case 'UPDATE_FILTERS':
      const { fromAmount, fromCurrency, toCurrency } = action.payload;

      const inputCurrency = state.currencies.find((cur) => cur.legacyTicker === fromCurrency) || state.input.currency;
      const outputCurrency = state.currencies.find((cur) => cur.legacyTicker === toCurrency) || state.output.currency;
      const inputAmount = fromAmount || state.input.amount;

      return {
        ...state,
        input: {
          ...state.input,
          currency: inputCurrency,
          amount: inputAmount
        },
        output: {
          ...state.output,
          currency: outputCurrency
        }
      };
    case 'SET_AMOUNT':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          amount: action.payload.amount
        }
      };
    case 'SET_LOADING':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          isLoading: action.payload.loading
        }
      };

    case 'SET_MIN_AMOUNT':
      return {
        ...state,
        input: {
          ...state.input,
          minAmount: action.payload
        }
      };

    case 'SET_CURRENCY_ERROR':
      return {
        ...state,
        [action.payload.type]: {
          ...state[action.payload.type],
          errorText: action.payload.error
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorText: action.payload
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        errorText: null,
        input: {
          ...state.input,
          errorText: null
        },
        output: {
          ...state.output,
          errorText: null
        }
      };
    default:
      return state;
  }
};
