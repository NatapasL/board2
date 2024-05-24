import styled from '@emotion/styled';

import { colors } from '../../styles/variables';

interface BackdropProps {
  active?: boolean;
}

export const Backdrop = styled.div`
  width: ${(props: BackdropProps): string => (props.active ? '100vw' : '0')};
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

interface ContainerProps {
  active?: boolean;
  boardLength: number;
}

export const Container = styled.div`
  position: fixed;
  height: ${(props: ContainerProps): string => (props.active ? `${props.boardLength * 38 + 48}px` : '0')};
  max-height: calc(100vh - 48px);
  width: 100vw;
  bottom: 48px;
  right: 0;
  background-color: ${colors.grey};
  overflow: scroll;
  scroll-behavior: smooth;
  transition: height 100ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed ${colors.white};
  border-radius: 4px 4px 0 0;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

export const ItemContainer = styled.a`
  background-color: ${colors.white};
  margin-bottom: 1px;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  width: 100%;
`;

export const ItemLeftText = styled.div`
  font-weight: bold;
  font-size: 16px;
  padding: 8px 8px 8px 20px;
  flex-grow: 1;
  overflow: hidden;
`;

export const ItemRightText = styled.div`
  display: flex;
  height: 100%;
  min-height: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: 16px;
  padding-left: 8px;
`;

export const LinkButton = styled.div`
  font-size: 12px;
  background-color: ${colors.grey};
  padding: 4px 8px;
  border-radius: 0 0 4px 4px;
  font-weight: bold;
`;

export const SelectBar = styled.div`
  box-sizing: border-box;
  width: calc(100% - 32px);
  /* background-color: white; */
  font-weight: 600;
  padding: 4px 8px;
  margin: 4px 16px 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100vw;
  overflow: hidden;
`;

export const BlockManagementButton = styled.a`
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colors.black4};
`;
