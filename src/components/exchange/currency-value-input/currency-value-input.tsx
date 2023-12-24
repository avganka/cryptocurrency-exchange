import { ForwardedRef, forwardRef, useState } from 'react';
import { StyledCurrencyButton, StyledValueInput } from './currency-value-input.style';
import { Currency } from '@/core/types/currency';

interface CurrencyValueInputProps {
  currency: Currency | null;
}

const CurrencyValueInput = forwardRef(function CurrencyValueInput(
  { currency }: CurrencyValueInputProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const [value, setValue] = useState('');

  return (
    <>
      <StyledValueInput type='number' value={value} onChange={(evt) => setValue(evt.target.value)} />
      {currency && (
        <StyledCurrencyButton ref={ref}>
          <img width={16} height={16} src={currency.image} alt={currency.ticker} aria-hidden={true} />
          <span>{currency.ticker.toUpperCase()}</span>
        </StyledCurrencyButton>
      )}
    </>
  );
});

export default CurrencyValueInput;
