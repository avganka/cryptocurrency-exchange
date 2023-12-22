import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  *, ::before, ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: white;
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fontFamily};
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
  }
`;

export const theme = {
  colors: {
    text: '#282828',
    textLight: '#80A2B6',
    background: '#ffffff',

    accent: '#0095E0',
    accentDisabled: '#11B3FE',
    accentHover: '#016aa3',

    gray: '#F6F7F8',
    darkGray: '#E3EBEF',

    borderDark: '#C1D9E5',
    inputHover: '#EAF1F7'
  },
  borderRadius: '5px',
  fontFamily: 'Roboto, sans-serif'
};
