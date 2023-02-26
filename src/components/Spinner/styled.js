import styled from '@emotion/styled';

import { zIndex, colors } from 'src/styles/variables';

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: ${zIndex['9999']};
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 150px;
  background-color: ${colors.grey};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SpinnerAnimation = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid ${colors.black5};
  border-top: 4px solid ${colors.black4};
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Text = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;
