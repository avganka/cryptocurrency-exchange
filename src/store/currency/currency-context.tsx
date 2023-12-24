import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useRef } from 'react';

import { Action, CurrencyContextType, currencyReducer, initialState } from './reducer';

import { CurrencyService } from '@/core/services/currencies';
import { getDataFromUrl } from '@/core/utils/get-data-from-url';
import { DEFAULT_ERROR_MESSAGE } from '@/core/constants/exchange';
import { ExchangeType } from '@/core/types/currency';
import { deleteUrlParam, updateUrlParams } from '@/core/utils/update-url-params';

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

  const { input, output, exchangeType, currencies } = store;

  const currencyService = useRef(new CurrencyService());

  const fetchCurrencies = async () => {
    try {
      const data = await currencyService.current.fetchCurrenciesList();
      dispatch({ type: 'SET_CURRENCIES', payload: data.currencies });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_MESSAGE });
      }
    }
  };

  // eslint-disable-next-line complexity
  const fetchActiveCurrencies = async () => {
    const search = getDataFromUrl();

    const fromCurrency = search.fromCurrency
      ? currencies.find((cur) => cur.legacyTicker === search.fromCurrency) || currencies[0]
      : currencies[0];

    updateUrlParams('fromCurrency', fromCurrency.legacyTicker);
    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency: fromCurrency, type: 'input' } });

    const toCurrency = search.toCurrency
      ? currencies.find((cur) => cur.legacyTicker === search.toCurrency) || currencies[1]
      : currencies[1];

    updateUrlParams('toCurrency', toCurrency.legacyTicker);
    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency: toCurrency, type: 'output' } });

    if (search.amount) {
      updateUrlParams('amount', search.amount);
      dispatch({ type: 'SET_AMOUNT', payload: { amount: Number(search.amount), type: 'input' } });
      deleteUrlParam('toAmount');
    }
    if (search.toAmount) {
      updateUrlParams('toAmount', search.toAmount);
      deleteUrlParam('amount');
      dispatch({ type: 'SET_AMOUNT', payload: { amount: Number(search.toAmount), type: 'output' } });
      dispatch({ type: 'SET_TYPE', payload: 'reverse' });
    }

    try {
      const { minimalExchangeAmount } = await currencyService.current.fetchMinimalExchangeAmount({
        fromCurrency: fromCurrency.ticker,
        fromNetwork: fromCurrency.network,
        toCurrency: toCurrency.ticker,
        toNetwork: toCurrency.network
      });

      if (!search.amount && !search.toAmount) {
        updateUrlParams('amount', minimalExchangeAmount.minAmount.toString());
        dispatch({ type: 'SET_AMOUNT', payload: { amount: minimalExchangeAmount.minAmount, type: 'input' } });
      }
      dispatch({ type: 'SET_MIN_AMOUNT', payload: minimalExchangeAmount.minAmount });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } else {
        dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_MESSAGE });
      }
    }
  };

  const fetchEstimatedExchangeAmount = async (exchangeFlow: ExchangeType) => {
    if (input.currency && output.currency) {
      let flow = {};

      if (exchangeFlow === 'direct') {
        flow = {
          type: exchangeFlow,
          fromAmount: input.amount.toString()
        };
      }

      if (exchangeFlow === 'reverse') {
        flow = {
          type: exchangeFlow,
          toAmount: output.amount.toString(),
          flow: 'fixed-rate'
        };
      }

      try {
        const { estimatedExchangeAmount } = await currencyService.current.fetchEstimatedExchangeAmount({
          fromCurrency: input.currency.ticker,
          fromNetwork: input.currency.network,
          toCurrency: output.currency.ticker,
          toNetwork: output.currency.network,
          ...flow
        });

        //if (exchangeFlow === 'direct') {
        //  dispatch({ type: 'SET_AMOUNT', payload: { amount: estimatedExchangeAmount.toAmount, type: 'output' } });
        //}
        //if (exchangeFlow === 'reverse') {
        //  dispatch({ type: 'SET_AMOUNT', payload: { amount: estimatedExchangeAmount.fromAmount, type: 'input' } });
        //}

        dispatch({ type: 'SET_AMOUNT', payload: { amount: estimatedExchangeAmount.toAmount, type: 'output' } });
        dispatch({ type: 'SET_AMOUNT', payload: { amount: estimatedExchangeAmount.fromAmount, type: 'input' } });
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: 'SET_ERROR', payload: error.message });
        } else {
          dispatch({ type: 'SET_ERROR', payload: DEFAULT_ERROR_MESSAGE });
        }
      }
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (currencies) {
      fetchActiveCurrencies();
    }
  }, [currencies]);

  useEffect(() => {
    fetchActiveCurrencies();
  }, [input.currency, output.currency]);

  useEffect(() => {
    fetchEstimatedExchangeAmount(exchangeType);
  }, [input.amount, output.amount, input.currency, output.currency]);

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
