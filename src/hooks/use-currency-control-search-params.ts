import { Dispatch, useEffect, useRef } from 'react';

import { Action, CurrencyContextType } from '@/store/currency/reducer';
import { serializeParams } from '@/core/utils/serialize-params';

export const useCurrencyControlSearchParams = (state: CurrencyContextType, dispatch: Dispatch<Action>) => {
  const mounted = useRef(false);

  const updateStoreFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const updatedFilters: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      updatedFilters[key] = value;
    });

    dispatch({ type: 'UPDATE_FILTERS', payload: updatedFilters });
  };

  const updateUrlFromStore = () => {
    if (state.input.currency && state.output.currency) {
      const paramsObject = {
        fromCurrency: state.input.currency.legacyTicker || null,
        toCurrency: state.output.currency.legacyTicker || null,
        fromAmount: state.input.amount || null
      };

      const serializedSring = serializeParams(paramsObject);
      const newUrl = `${window.location.pathname}?${serializedSring}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  useEffect(() => {
    // Обновление Стора при инициализации из URL
    updateStoreFromUrl();
    mounted.current = true;
  }, []);

  useEffect(() => {
    // Обновление URL из при обновлении Стора
    if (mounted) {
      updateUrlFromStore();
    }
  }, [state, mounted.current]);

  return {
    updateStoreFromUrl,
    updateUrlFromStore
  };
};
