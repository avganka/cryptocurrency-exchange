import { StyledWrapper } from './exchange-widget.style';
import ExchangeControl from '@/components/exchange/exchange-control/exchange-control';

import ChangeSymbol from '@components/change-symbol/change-symbol';

const ExchangeWidget = () => {
  return (
    <StyledWrapper>
      <ExchangeControl type={'input'} />
      <ChangeSymbol />
      <ExchangeControl type={'output'} />
    </StyledWrapper>
  );
};

export default ExchangeWidget;
