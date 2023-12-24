import { Currency } from '@/core/types/currency';
import { StyledCurrencyCloseButton, StyledCurrencySearch } from './currency-switcher.style';

import { SWITCH_CURRENCY_INPUT_TEXT } from '@/core/constants/exchange';

import CurrencyList from '@components/exchange/currency-list/currency-list';
import { useState } from 'react';

interface CurrencySwitcherProps {
  showList: boolean;
  currencies: Currency[];
  onClose: () => void;
}

const CurrencySwitcher = (props: CurrencySwitcherProps) => {
  const { showList, currencies, onClose } = props;

  const [value, setValue] = useState('');

  const handleClose = () => {
    onClose();
    setValue('');
  };

  const filteredCurrencies = currencies
    .filter(
      (currency) =>
        currency.ticker.toLowerCase().includes(value.toLowerCase()) ||
        currency.name.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 100);

  return (
    <>
      <StyledCurrencySearch
        type='text'
        placeholder={SWITCH_CURRENCY_INPUT_TEXT}
        $open={showList}
        autoFocus
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
      />
      <StyledCurrencyCloseButton onClick={handleClose} />
      <CurrencyList currencies={filteredCurrencies} open={showList} />
    </>
  );
};

export default CurrencySwitcher;
