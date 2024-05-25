import styled from 'styled-components';

import { colors } from '../../styles/variables';

interface BackdropProps {
  active?: boolean;
}

export const Backdrop = styled.div<BackdropProps>`
  width: ${(props): string => (props.active ? '100vw' : '0')};
  height: calc(100vh - 48px);
  position: fixed;
  bottom: 48px;
  right: 0;
  background-color: ${colors.black1};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  opacity: ${(props: BackdropProps): string => (props.active ? '0.9' : '0')};
  transition: opacity 250ms;
`;

interface Content {
  active?: boolean;
}

export const Content = styled.div<Content>`
  position: fixed;
  height: auto;
  max-height: calc(100vh - 48px);
  width: 100vw;
  bottom: 48px;
  right: 0;
  overflow: scroll;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
