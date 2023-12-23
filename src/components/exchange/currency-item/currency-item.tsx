import { Currency } from '@/core/types/currency';
import { CurrencyCode, CurrencyName, StyledListItem } from './currency-item.style';

interface CurrencyProps {
  currency: Currency;
}

const CurrencyItem = ({ currency }: CurrencyProps) => {
  return (
    <StyledListItem tabIndex={0}>
      <img src={currency.image} alt={currency.ticker} aria-hidden={true} />
      <CurrencyCode>{currency.ticker.toUpperCase()}</CurrencyCode>
      <CurrencyName>{currency.name}</CurrencyName>
    </StyledListItem>
  );
};

export default CurrencyItem;
