import { ForwardedRef, forwardRef } from 'react';
import { StyledCurrencyButton, StyledValueInput } from './currency-value-input.style';
import { Currency } from '@/core/types/currency';

interface CurrencyValueInputProps {
  currency: Currency;
}

const CurrencyValueInput = forwardRef(function CurrencyValueInput(
  { currency }: CurrencyValueInputProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <>
      <StyledValueInput type='number' />
      <StyledCurrencyButton ref={ref}>
        <img width={16} height={16} src={currency.image} alt={currency.ticker} aria-hidden={true} />
        <span>BTC</span>
      </StyledCurrencyButton>
    </>
  );
});

export default CurrencyValueInput;
