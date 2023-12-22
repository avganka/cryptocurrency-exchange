import { StyledWrapper } from './exchange-widget.style';
import CurrencySelector from '@components/currency-selector/currency-selector';
import ChangeSymbol from '@components/change-symbol/change-symbol';

const ExchangeWidget = () => {
  return (
    <StyledWrapper>
      <CurrencySelector />
      <ChangeSymbol />
      <CurrencySelector />
    </StyledWrapper>
  );
};

export default ExchangeWidget;
