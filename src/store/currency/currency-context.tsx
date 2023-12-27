import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { AxiosError } from 'axios';

import { Action, CurrencyContextType, currencyReducer, initialState } from './reducer';

import { DEFAULT_ERROR_TEXT, PAIR_INACTIVE_ERROR_TEXT, SMALL_DEPOSIT_ERROR_TEXT } from '@/core/constants/errors';
import { CurrencyService } from '@/core/services/currencies';
import { ControlTypes, Currency } from '@/core/types/currency';
import { getSearchParamsFromUrl } from '@/core/utils/get-search-params-from-url';
import { Errors } from '@/core/types/errors';
import { useCurrencyControlSearchParams } from '@/hooks/use-currency-control-search-params';

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
export interface SearchParams {
  toCurrency: string | null;
  fromCurrency: string | null;
  toAmount: string | null;
  fromAmount: string | null;
}

export const CurrencyProvider = ({ children }: CurrencyContextProps) => {
  const [store, dispatch] = useReducer(currencyReducer, initialState);
  const { input, output } = store;

  const currencyService = useRef(new CurrencyService());

  useCurrencyControlSearchParams(store, dispatch);

  const fetchCurrencies = async () => {
    try {
      const { currencies: currenciesList } = await currencyService.current.fetchCurrenciesList();
      dispatch({ type: 'SET_CURRENCIES', payload: currenciesList });
      setActiveCurrencies(currenciesList);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_TEXT });
    }
  };

  const setActiveCurrencies = (currenciesList: Currency[]) => {
    const searchParams = getSearchParamsFromUrl();
    const fromCurrency = searchParams.fromCurrency
      ? currenciesList.find((cur) => cur.legacyTicker === searchParams.fromCurrency) || currenciesList[0]
      : currenciesList[0];

    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency: fromCurrency, type: ControlTypes.INPUT } });

    const toCurrency = searchParams.toCurrency
      ? currenciesList.find((cur) => cur.legacyTicker === searchParams.toCurrency) || currenciesList[1]
      : currenciesList[1];

    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency: toCurrency, type: ControlTypes.OUTPUT } });
  };

  // eslint-disable-next-line consistent-return
  const fetchMinimalExchangeAmount = async (state: CurrencyContextType) => {
    const searchParams = getSearchParamsFromUrl();

    try {
      const { minimalExchangeAmount } = await currencyService.current.fetchMinimalExchangeAmount({
        fromCurrency: state.input.currency?.ticker || '',
        fromNetwork: state.input.currency?.network,
        toCurrency: state.output.currency?.ticker || '',
        toNetwork: state.output.currency?.network
      });

      dispatch({ type: 'SET_MIN_AMOUNT', payload: minimalExchangeAmount.minAmount.toString() });

      const fromAmount = searchParams.fromAmount ? searchParams.fromAmount : minimalExchangeAmount.minAmount.toString();

      dispatch({
        type: 'SET_AMOUNT',
        payload: { amount: fromAmount, type: ControlTypes.INPUT }
      });
      return minimalExchangeAmount.minAmount.toString();
    } catch (error) {
      errorHandler(state, error);
    }
  };

  const fetchEstimatedExchangeAmount = async (state: CurrencyContextType) => {
    dispatch({
      type: 'SET_LOADING',
      payload: { loading: true, type: ControlTypes.OUTPUT }
    });
    try {
      const { estimatedExchangeAmount } = await currencyService.current.fetchEstimatedExchangeAmount({
        fromCurrency: state.input.currency?.ticker || '',
        fromNetwork: state.input.currency?.network,
        toCurrency: state.output.currency?.ticker || '',
        toNetwork: state.output.currency?.network,
        fromAmount: state.input.amount,
        type: 'direct'
      });

      dispatch({
        type: 'SET_AMOUNT',
        payload: { amount: estimatedExchangeAmount.toAmount.toString(), type: ControlTypes.OUTPUT }
      });
    } catch (error) {
      errorHandler(state, error);
    }
    dispatch({
      type: 'SET_LOADING',
      payload: { loading: false, type: ControlTypes.OUTPUT }
    });
  };

  const errorHandler = (state: CurrencyContextType, error: unknown) => {
    if (error instanceof AxiosError) {
      switch (error.response?.data.error) {
        case Errors.PAIR_INACTIVE:
          dispatch({ type: 'SET_ERROR', payload: PAIR_INACTIVE_ERROR_TEXT });
          break;
        case Errors.SMALL_DEPOSIT:
          dispatch({
            type: 'SET_CURRENCY_ERROR',
            payload: {
              error: SMALL_DEPOSIT_ERROR_TEXT(state.input.currency?.ticker || '', state.input.minAmount),
              type: ControlTypes.INPUT
            }
          });
          break;
        default:
          dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_TEXT });
          break;
      }

      dispatch({
        type: 'SET_AMOUNT',
        payload: { amount: '-', type: ControlTypes.OUTPUT }
      });
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const updateEstimatedExchangeAmount = async () => {
      dispatch({ type: 'CLEAR_ERRORS' });
      if (input.currency && output.currency) {
        const minAmount = (await fetchMinimalExchangeAmount(store)) || input.minAmount;

        if (Number(input.amount) < Number(minAmount)) {
          dispatch({
            type: 'SET_CURRENCY_ERROR',
            payload: {
              error: SMALL_DEPOSIT_ERROR_TEXT(store.input.currency?.ticker || '', minAmount),
              type: ControlTypes.INPUT
            }
          });
          dispatch({
            type: 'SET_AMOUNT',
            payload: { amount: '-', type: ControlTypes.OUTPUT }
          });
        } else {
          await fetchEstimatedExchangeAmount(store);
        }

        dispatch({
          type: 'SET_LOADING',
          payload: { loading: false, type: ControlTypes.OUTPUT }
        });
      }
    };

    updateEstimatedExchangeAmount();
  }, [input.amount, input.currency, output.currency]);

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
