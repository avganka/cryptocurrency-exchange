import { StyledWrapper } from './exchange-widget.style';
import ExchangeControl from '@/components/exchange/exchange-control/exchange-control';
import { useCurrencyContext } from '@/store/currency/currency-context';

import ChangeSymbol from '@components/change-symbol/change-symbol';

const ExchangeWidget = () => {
  const { store } = useCurrencyContext();

  return (
    <StyledWrapper>
      <ExchangeControl currencies={store.currencies} selectedCurrency={store.inputCurrency.currency} />
      <ChangeSymbol />
      <ExchangeControl currencies={store.currencies} selectedCurrency={store.outputCurrency.currency} />
    </StyledWrapper>
  );
};

export default ExchangeWidget;
