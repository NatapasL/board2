import { BREAKPOINTS } from '../constants/styles';

export const mq = Object.entries(BREAKPOINTS).reduce<Record<string, string>>((acc, [key, val]) => {
  acc[key] = `@media (min-width: ${val}px)`;

  return acc;
}, {});

export const zIndex = {
  10: 10,
  20: 20,
  30: 30,
  40: 40,
  50: 50,
  9999: 9999,
};

export const colors = {
  white: '#fff',
  black: '#000',
  black1: '#1A1A1B',
  black2: '#212425',
  black3: '#333333',
  black4: '#37414B',
  black5: '#6e7881',
  grey: '#EDEFF1',
  link: '#0079D3',
  highlight: '#AFC9CF',
};
