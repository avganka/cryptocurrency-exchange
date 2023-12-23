import { StyledList } from './currency-list.style';

import { Currency } from '@/core/types/currency';

import CurrencyItem from '@/components/exchange/currency-item/currency-item';

interface CurrencyListProps {
  open?: boolean;
  currencies: Currency[];
}

const CurrencyList = ({ currencies, open = false }: CurrencyListProps) => {
  return (
    <StyledList $open={open}>
      {currencies.map((currency) => (
        <CurrencyItem key={currency.ticker} currency={currency} />
      ))}
    </StyledList>
  );
};

export default CurrencyList;
