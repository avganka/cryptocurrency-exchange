import { CurrencyCode, CurrencyName, StyledListItem } from './currency-item.style';

import { Currency } from '@/core/types/currency';

interface CurrencyProps {
  currency: Currency;
  onClick: (currency: Currency) => void;
}

const CurrencyItem = ({ currency, onClick }: CurrencyProps) => {
  return (
    <StyledListItem tabIndex={0} onClick={() => onClick(currency)}>
      <img width={16} height={16} src={currency.image} alt={currency.ticker} aria-hidden={true} loading='lazy' />
      <CurrencyCode>{currency.ticker.toUpperCase()}</CurrencyCode>
      <CurrencyName>{currency.name}</CurrencyName>
    </StyledListItem>
  );
};

export default CurrencyItem;
