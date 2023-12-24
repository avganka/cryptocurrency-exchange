import styled from 'styled-components';

import Page from '@components/page/page';
import CryptoWalletBlock from '@/components/exchange/crypto-wallet-block/crypto-wallet-block';
import ExchangeWidget from '@/components/exchange/exchange-widget/exchange-widget';
import { CurrencyProvider } from '@/store/currency/currency-context';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
