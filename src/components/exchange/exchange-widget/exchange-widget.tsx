import { StyledWrapper } from './exchange-widget.style';
import ExchangeControl from '@/components/exchange/exchange-control/exchange-control';
import { CurrencyContext } from '@/core/context/currency-context';
import ChangeSymbol from '@components/change-symbol/change-symbol';
import { useContext } from 'react';

const ExchangeWidget = () => {
  const { currencies, inputCurrency, outputCurrency } = useContext(CurrencyContext);

  return (
    <StyledWrapper>
      <ExchangeControl currencies={currencies} selectedCurrency={inputCurrency} />
      <ChangeSymbol />
      <ExchangeControl currencies={currencies} selectedCurrency={outputCurrency} />
    </StyledWrapper>
  );
};

export default ExchangeWidget;
