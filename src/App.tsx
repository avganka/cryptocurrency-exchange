import { ThemeProvider } from 'styled-components';

import { GlobalStyle, theme } from './global';

import Exchange from '@/pages/exchange';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Exchange />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
