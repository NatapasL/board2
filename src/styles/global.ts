import { createGlobalStyle } from 'styled-components';
import { colors } from './variables';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Sarabun', sans-serif;
    line-height: 1.35;
    color: ${colors.black2};
    font-weight: 300;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    outline: none;
  }

  a {
    text-decoration: none;
  }

  body {
    padding: 0;
    margin: 0;
  }
`;
