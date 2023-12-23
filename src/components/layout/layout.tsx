import { ReactNode } from 'react';
import Header from '@components/header/header';

import styled from 'styled-components';
import { CurrencyProvider } from '@/core/context/currency-context';
import { CURRENCIES } from '@/MOCK';

const StyledLayout = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 200px 10px 50px;

  height: 100dvh;
  height: 100vh;
`;

const StyledMain = styled.main``;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <CurrencyProvider currencies={CURRENCIES}>
      <StyledLayout>
        <Header />
        <StyledMain>{children}</StyledMain>
      </StyledLayout>
    </CurrencyProvider>
  );
};

export default Layout;
