import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useRef } from 'react';

import { Action, CurrencyContextType, currencyReducer, initialState } from './reducer';

import { CurrencyService } from '@/core/services/currencies';
import { getDataFromUrl } from '@/core/utils/get-data-from-url';
import { DEFAULT_ERROR_MESSAGE } from '@/core/constants/exchange';

const CurrencyContext = createContext<{
  store: CurrencyContextType;
  dispatch: Dispatch<Action>;
}>({
  store: initialState,
  dispatch: () => {}
});

export const useCurrencyContext = () => useContext(CurrencyContext);

interface CurrencyContextProps {
  children: ReactNode;
}

export const CurrencyProvider = ({ children }: CurrencyContextProps) => {
  const [store, dispatch] = useReducer(currencyReducer, initialState);

  const currencyService = useRef(new CurrencyService());

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const { currencies } = await currencyService.current.fetchCurrenciesList();
        dispatch({ type: 'SET_CURRENCIES', payload: currencies });

        const search = getDataFromUrl();

        const fromCurrency = search.fromCurrency
          ? currencies.find((cur) => cur.legacyTicker === search.fromCurrency) || currencies[0]
          : currencies[0];

        dispatch({ type: 'SET_INPUT_CURRENCY', payload: fromCurrency });

        const toCurrency = search.toCurrency
          ? currencies.find((cur) => cur.legacyTicker === search.toCurrency) || currencies[1]
          : currencies[1];

        dispatch({ type: 'SET_OUTPUT_CURRENCY', payload: toCurrency });

        if (!search.amount) {
          const { minimalExchangeAmount } = await currencyService.current.fetchMinimalExchangeAmount({
            fromCurrency: fromCurrency.legacyTicker,
            toCurrency: toCurrency.legacyTicker
          });

          dispatch({ type: 'SET_INPUT_AMOUNT', payload: minimalExchangeAmount.minAmount });
          dispatch({ type: 'SET_MIN_AMOUNT', payload: minimalExchangeAmount.minAmount });
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        } else {
          dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_MESSAGE });
        }
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        store,
        dispatch
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
