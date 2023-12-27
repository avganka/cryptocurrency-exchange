import { useRef } from 'react';
import { CurrencyCode, CurrencyName, ListContainer, StyledList, StyledListItem } from './currency-list.style';

import { Currency } from '@/core/types/currency';
import { useVirtualScroll } from '@/hooks/use-virtual-scroll';

const containerHeight = 225;
const itemHeight = 45;

interface CurrencyListProps {
  open?: boolean;
  currencies: Currency[];
  onClick: (currency: Currency) => void;
}

const CurrencyList = ({ currencies, open = false, onClick }: CurrencyListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { virtualItems, listHeight } = useVirtualScroll({
    containerHeight,
    itemHeight,
    itemsCount: currencies.length,
    containerRef
  });

  return (
    <ListContainer style={{ height: containerHeight }} ref={containerRef}>
      <StyledList $open={open} style={{ height: listHeight }}>
        {virtualItems.map(({ index, offset }) => {
          const currency = currencies[index];
          return (
            <StyledListItem
              key={currency.legacyTicker}
              tabIndex={0}
              onClick={() => onClick(currency)}
              style={{ height: itemHeight, transform: `translateY(${offset}px)` }}
            >
              <img
                width={16}
                height={16}
                src={currency.image}
                alt={currency.ticker}
                aria-hidden={true}
                loading='lazy'
              />
              <CurrencyCode>{currency.ticker.toUpperCase()}</CurrencyCode>
              <CurrencyName>{currency.name}</CurrencyName>
            </StyledListItem>
          );
        })}
      </StyledList>
    </ListContainer>
  );
};

export default CurrencyList;
