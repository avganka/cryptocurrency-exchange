import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

import {
  ErrorText,
  SpinnerWrapper,
  StyledCurrencyButton,
  StyledCurrencyCloseButton,
  StyledCurrencySearch,
  StyledValueInput,
  StyledWrapper
} from './exchange-control.style';

import { useCurrencyContext } from '@/store/currency/currency-context';
import { SWITCH_CURRENCY_INPUT_TEXT } from '@/core/constants/exchange';
import { ControlTypes, Currency } from '@/core/types/currency';
import { useSwitcherControl } from '@/hooks/use-switcher-control';

import CurrencyList from '@components/exchange/currency-list/currency-list';
import Spinner from '@/components/spinner/spinner';

interface ExchangeControlProps {
  type: ControlTypes;
}

const ExchangeControl = ({ type }: ExchangeControlProps) => {
  const { store, dispatch } = useCurrencyContext();
  const { currencies } = store;
  const { currency: selectedCurrency, amount, isLoading, errorText } = store[type];

  const [currencyValue, setCurrencyValue] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [showCurrenciesList, setShowCurrenciesList] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openListHandler = () => {
    setShowCurrenciesList(true);
  };

  const closeListHandler = () => {
    setShowCurrenciesList(false);
    setCurrencyName('');
  };

  const changeActiveCurrencyHandler = (currency: Currency) => {
    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency, type } });
    closeListHandler();
  };

  const debouncedDispatch = useCallback(
    debounce((value) => {
      dispatch({ type: 'SET_AMOUNT', payload: { amount: value, type } });
    }, 500),
    [dispatch, type]
  );

  const changeValueHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrencyValue(evt.target.value);
    debouncedDispatch(evt.target.value);
  };

  useEffect(() => {
    setCurrencyValue(amount);
  }, [amount]);

  useSwitcherControl(rootRef, buttonRef, showCurrenciesList, closeListHandler, openListHandler);

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.ticker.toLowerCase().includes(currencyName.toLowerCase()) ||
      currency.name.toLowerCase().includes(currencyName.toLowerCase())
  );

  return (
    <StyledWrapper ref={rootRef}>
      {!showCurrenciesList ? (
        <>
          <StyledValueInput
            type='number'
            value={isLoading ? '' : currencyValue}
            onChange={changeValueHandler}
            disabled={type === ControlTypes.OUTPUT}
          />
          {isLoading && (
            <SpinnerWrapper>
              <Spinner size={20} />
            </SpinnerWrapper>
          )}
          {errorText && <ErrorText>{errorText}</ErrorText>}
          {selectedCurrency && (
            <StyledCurrencyButton ref={buttonRef}>
              <img
                width={16}
                height={16}
                src={selectedCurrency.image}
                alt={selectedCurrency.ticker}
                aria-hidden={true}
              />
              <span>{selectedCurrency.ticker.toUpperCase()}</span>
            </StyledCurrencyButton>
          )}
        </>
      ) : (
        <>
          <StyledCurrencySearch
            type='text'
            placeholder={SWITCH_CURRENCY_INPUT_TEXT}
            $open={showCurrenciesList}
            autoFocus
            value={currencyName}
            onChange={(evt) => setCurrencyName(evt.target.value)}
          />
          <StyledCurrencyCloseButton onClick={closeListHandler} />
          <CurrencyList
            currencies={filteredCurrencies}
            open={showCurrenciesList}
            onClick={changeActiveCurrencyHandler}
          />
        </>
      )}
    </StyledWrapper>
  );
};

export default ExchangeControl;
