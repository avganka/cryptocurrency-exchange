import { ChangeEvent, useRef, useState } from 'react';

import { StyledWrapper } from './exchange-control.style';

import { Currency } from '@/core/types/currency';
import { useSwitcherControl } from '@/hooks/use-switcher-control';
import { StyledCurrencyButton, StyledValueInput } from '../currency-value-input/currency-value-input.style';
import { StyledCurrencyCloseButton, StyledCurrencySearch } from '../currency-switcher/currency-switcher.style';
import CurrencyList from '../currency-list/currency-list';
import { SWITCH_CURRENCY_INPUT_TEXT } from '@/core/constants/exchange';
import { useCurrencyContext } from '@/store/currency/currency-context';
import { deleteUrlParam, updateUrlParams } from '@/core/utils/update-url-params';

interface ExchangeControlProps {
  type: 'input' | 'output';
}

const ExchangeControl = ({ type }: ExchangeControlProps) => {
  const { store, dispatch } = useCurrencyContext();
  const { currencies } = store;
  const { currency: selectedCurrency, amount } = store[type];

  const [currencyName, setCurrencyName] = useState('');
  const [showCurrenciesList, setShowCurrenciesList] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    setShowCurrenciesList(true);
  };

  const onClose = () => {
    setShowCurrenciesList(false);
    setCurrencyName('');
  };

  const setActiveCurrency = (currency: Currency) => {
    dispatch({ type: 'SET_ACTIVE_CURRENCY', payload: { currency, type } });
    dispatch({ type: 'SET_TYPE', payload: 'direct' });
    updateUrlParams(type === 'input' ? 'fromCurrency' : 'toCurrency', currency.legacyTicker);
    onClose();
  };

  const changeValueHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_AMOUNT', payload: { amount: Number(evt.target.value), type } });
    dispatch({ type: 'SET_TYPE', payload: type === 'input' ? 'direct' : 'reverse' });
    updateUrlParams(type === 'input' ? 'amount' : 'toAmount', evt.target.value);
    deleteUrlParam(type === 'input' ? 'toAmount' : 'amount');
  };

  useSwitcherControl(rootRef, buttonRef, showCurrenciesList, onClose, onClick);

  const filteredCurrencies = currencies
    .filter(
      (currency) =>
        currency.ticker.toLowerCase().includes(currencyName.toLowerCase()) ||
        currency.name.toLowerCase().includes(currencyName.toLowerCase())
    )
    .slice(0, 100);

  return (
    <StyledWrapper ref={rootRef}>
      {!showCurrenciesList ? (
        <>
          <StyledValueInput type='number' value={amount.toString()} onChange={changeValueHandler} />
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
          <StyledCurrencyCloseButton onClick={onClose} />
          <CurrencyList currencies={filteredCurrencies} open={showCurrenciesList} onClick={setActiveCurrency} />
        </>
      )}
    </StyledWrapper>
  );
};

export default ExchangeControl;
