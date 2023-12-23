import { FormEvent, useState } from 'react';
import { StyledLabel, StyledWrapper } from './crypto-wallet-block.style';

import { WALLET_ADDRESS_NAME, WALLET_EXCHANGE_BUTTON_TEXT, WALLET_LABEL_TEXT } from '@/core/constants/crypto-wallet';

import Button from '@/components/button/button';
import Input from '@components/input/input';

const CryptoWalletBlock = () => {
  const [isLoading, setLoading] = useState(false);
  const onClick = () => {
    setLoading((prev) => !prev);
  };

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    // Some logic
  };

  return (
    <form onSubmit={onSubmit}>
      <StyledLabel htmlFor={WALLET_ADDRESS_NAME}>{WALLET_LABEL_TEXT}</StyledLabel>
      <StyledWrapper>
        <Input type='text' id={WALLET_ADDRESS_NAME} />
        <Button type='submit' text={WALLET_EXCHANGE_BUTTON_TEXT} onClick={onClick} isLoading={isLoading} />
      </StyledWrapper>
    </form>
  );
};

export default CryptoWalletBlock;
