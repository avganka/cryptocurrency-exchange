import { Currency } from '@/core/types/currency';
import { updateUrlParams } from '@/core/utils/update-url-params';

export interface CurrencyContextType {
  currencies: Currency[];
  errorText: string | null;
  inputCurrency: {
    currency: Currency | null;
    amount: number;
    minAmount: number;
  };
  outputCurrency: {
    currency: Currency | null;
    amount: number;
  };
  estimateRate: number;
}

export const initialState: CurrencyContextType = {
  currencies: [],
  errorText: null,
  inputCurrency: {
    currency: null,
    amount: 0,
    minAmount: 0
  },
  outputCurrency: {
    currency: null,
    amount: 0
  },
  estimateRate: 0
};

export type Action =
  | { type: 'SET_CURRENCIES'; payload: Currency[] }
  | { type: 'SET_INPUT_CURRENCY'; payload: Currency }
  | { type: 'SET_OUTPUT_CURRENCY'; payload: Currency }
  | { type: 'SET_INPUT_AMOUNT'; payload: number }
  | { type: 'SET_OUTPUT_AMOUNT'; payload: number }
  | { type: 'SET_MIN_AMOUNT'; payload: number }
  | { type: 'SET_ESTIMATE_RATE'; payload: number }
  | { type: 'SET_ERROR'; payload: string };

export const currencyReducer = (state: CurrencyContextType, action: Action): CurrencyContextType => {
  switch (action.type) {
    case 'SET_CURRENCIES':
      return { ...state, currencies: action.payload };
    case 'SET_INPUT_CURRENCY':
      updateUrlParams('fromCurrency', action.payload.legacyTicker);
      return {
        ...state,
        inputCurrency: {
          ...state.inputCurrency,
          currency: action.payload
        }
      };
    case 'SET_OUTPUT_CURRENCY':
      updateUrlParams('toCurrency', action.payload.legacyTicker);
      return {
        ...state,
        outputCurrency: {
          ...state.outputCurrency,
          currency: action.payload
        }
      };
    case 'SET_INPUT_AMOUNT':
      return {
        ...state,
        inputCurrency: {
          ...state.inputCurrency,
          amount: action.payload
        }
      };

    case 'SET_MIN_AMOUNT':
      return {
        ...state,
        inputCurrency: {
          ...state.inputCurrency,
          minAmount: action.payload
        }
      };

    case 'SET_OUTPUT_AMOUNT':
      return {
        ...state,
        outputCurrency: {
          ...state.outputCurrency,
          amount: action.payload
        }
      };
    case 'SET_ESTIMATE_RATE':
      return { ...state, estimateRate: action.payload };
    case 'SET_ERROR':
      return { ...state, errorText: action.payload };
    default:
      return state;
  }
};
