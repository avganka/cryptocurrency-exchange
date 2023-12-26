import styled from 'styled-components';

import { CurrencyProvider } from '@/store/currency/currency-context';

import Page from '@components/page/page';
import CryptoWalletBlock from '@/components/exchange/crypto-wallet-block/crypto-wallet-block';
import ExchangeWidget from '@/components/exchange/exchange-widget/exchange-widget';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 900px) {
    gap: 48px;
  }
`;

const Exchange = () => (
  <Page>
    <CurrencyProvider>
      <StyledWrapper>
        <ExchangeWidget />
        <CryptoWalletBlock />
      </StyledWrapper>
    </CurrencyProvider>
  </Page>
);

export default Exchange;
