import { StyledList } from './currency-list.style';

import { Currency } from '@/core/types/currency';

import CurrencyItem from '@/components/exchange/currency-item/currency-item';

interface CurrencyListProps {
  open?: boolean;
  currencies: Currency[];
  onClick: (currency: Currency) => void;
}

const CurrencyList = ({ currencies, open = false, onClick }: CurrencyListProps) => {
  return (
    <StyledList $open={open}>
      {currencies.map((currency) => (
        <CurrencyItem key={currency.legacyTicker} currency={currency} onClick={onClick} />
      ))}
    </StyledList>
  );
};

export default CurrencyList;
