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

  //useEffect(() => {
  //  setValue(defaultValue.toString());
  //}, [defaultValue]);

  //useEffect(() => {
  //  const searchParams = new URLSearchParams(window.location.search);
  //  if (value !== defaultValue.toString()) {
  //    searchParams.set('amount', value);
  //  } else {
  //    searchParams.delete('amount');
  //  }
  //  window.history.pushState(null, '', '?' + searchParams.toString());
  //}, [value]);

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

//const CurrencyValueInput = ({ currency }: CurrencyValueInputProps) => {
//  console.log(currency);

//  return (
//    <>
//      <StyledValueInput type='number' />
//      <StyledCurrencyButton>
//        <img width={16} height={16} src={currency.image} alt={currency.ticker} aria-hidden={true} />
//        <span>BTC</span>
//      </StyledCurrencyButton>
//    </>
//  );
//};

export default CurrencyValueInput;
