import styled from 'styled-components';

import { colors } from 'src/styles/variables';

export const Button = styled.div`
  font-weight: 500;
  font-size: 10px;
  background-color: ${colors.grey};
  display: inline-flex;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
`;
