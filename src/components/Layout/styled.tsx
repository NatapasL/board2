import styled from '@emotion/styled';

import { colors, mq } from '../../styles/variables';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  min-height: 100vh;

  ${mq.sm} {
    max-width: 640px;
  }

  ${mq.md} {
    max-width: 768px;
  }

  ${mq.lg} {
    max-width: 980px;
  }
`;

export const Background = styled.div`
  background-color: ${colors.grey};
  padding-bottom: 16px;
`;
