import { useState } from 'react';

import CurrencyList from '@components/currency-list/currency-list';
import {
  StyledCurrencyButton,
  StyledCloseButton,
  StyledCurrencySearch,
  StyledValueInput,
  StyledWrapper
} from './currency-selector.style';

import { CURRENCIES } from '@/MOCK';

const CurrencySelector = () => {
  const [clicked, setClicked] = useState(false);

  const onClick = () => {
    setClicked(true);
  };

  const onClose = () => {
    setClicked(false);
  };
  return (
    <StyledWrapper>
      {!clicked ? (
        <>
          <StyledValueInput type='number' />
          <StyledCurrencyButton onClick={onClick}>
            <img
              width={16}
              height={16}
              src='https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg'
              alt='BTC'
              aria-hidden={true}
            />
            <span>BTC</span>
          </StyledCurrencyButton>
        </>
      ) : (
        <>
          <StyledCurrencySearch type='text' placeholder='Search' $open={clicked} />
          <StyledCloseButton onClick={onClose} />
          <CurrencyList currencies={CURRENCIES} open={clicked} />
        </>
      )}
    </StyledWrapper>
  );
};

export default CurrencySelector;
