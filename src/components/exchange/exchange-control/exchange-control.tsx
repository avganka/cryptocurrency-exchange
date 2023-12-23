import { useRef, useState } from 'react';

import { StyledWrapper } from './exchange-control.style';

import CurrencyValueInput from '@components/exchange/currency-value-input/currency-value-input';
import CurrencySwitcher from '@components/exchange/currency-switcher/currency-switcher';

import { Currency } from '@/core/types/currency';
import { useSwitcherControl } from '@/hooks/use-switcher-control';

interface ExchangeControlProps {
  currencies: Currency[];
  selectedCurrency: Currency;
}

const ExchangeControl = ({ currencies, selectedCurrency }: ExchangeControlProps) => {
  const [showList, setShowList] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClick = () => {
    setShowList(true);
  };

  const onClose = () => {
    setShowList(false);
  };

  useSwitcherControl(rootRef, buttonRef, showList, onClose, onClick);

  return (
    <StyledWrapper ref={rootRef}>
      {!showList ? (
        <CurrencyValueInput currency={selectedCurrency} ref={buttonRef} />
      ) : (
        <CurrencySwitcher currencies={currencies} onClose={onClose} showList={showList} />
      )}
    </StyledWrapper>
  );
};

export default ExchangeControl;
