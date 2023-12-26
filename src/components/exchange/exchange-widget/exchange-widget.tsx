import { StyledWrapper } from './exchange-widget.style';

import { useCurrencyContext } from '@/store/currency/currency-context';
import { ControlTypes } from '@/core/types/currency';

import ExchangeControl from '@/components/exchange/exchange-control/exchange-control';
import ChangeSymbol from '@components/change-symbol/change-symbol';

const ExchangeWidget = () => {
  const { dispatch } = useCurrencyContext();

  return (
    <StyledWrapper>
      <ExchangeControl type={ControlTypes.INPUT} />
      <ChangeSymbol onClick={() => dispatch({ type: 'SWITCH_CURRENCIES' })} />
      <ExchangeControl type={ControlTypes.OUTPUT} />
    </StyledWrapper>
  );
};

export default ExchangeWidget;
