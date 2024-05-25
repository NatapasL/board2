import styled from 'styled-components';

import { colors } from 'src/styles/variables';

export const Button = styled.div`
  box-sizing: border-box;
  font-weight: 500;
  font-size: 10px;
  background-color: ${colors.white};
  display: inline-flex;
  cursor: pointer;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
