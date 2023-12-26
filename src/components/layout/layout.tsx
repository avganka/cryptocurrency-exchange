import { ReactNode } from 'react';
import styled from 'styled-components';

import Header from '@components/header/header';

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
    <StyledLayout>
      <Header />
      <StyledMain>{children}</StyledMain>
    </StyledLayout>
  );
};

export default Layout;
