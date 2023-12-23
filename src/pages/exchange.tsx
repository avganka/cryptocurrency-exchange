import styled from 'styled-components';

import Page from '@components/page/page';
import CryptoWalletBlock from '@/components/exchange/crypto-wallet-block/crypto-wallet-block';
import ExchangeWidget from '@/components/exchange/exchange-widget/exchange-widget';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Exchange = () => {
  return (
    <Page>
      <StyledWrapper>
        <ExchangeWidget />
        <CryptoWalletBlock />
      </StyledWrapper>
    </Page>
  );
};

export default Exchange;
