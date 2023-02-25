import styled from '@emotion/styled';

import { colors } from '../../styles/variables';

export const Container = styled.div`
  position: fixed;
  width: ${props => props.active ? '100vw' : 0};
  height: calc(100vh - 40px);
  top: 40px;
  right: 0;
  background-color: ${colors.grey};
  overflow: scroll;
  scroll-behavior: smooth;
  transition: width 250ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px dashed ${colors.white};
`;

export const TitleContainer = styled.div`
  background-color: ${colors.white};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 4px;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  white-space: nowrap;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding-bottom: 16px;
  width: 100%;
  height: 100%;
  margin-bottom: 75px;
`;

export const ItemContainer = styled.a`
  background-color: ${colors.white};
  margin-bottom: 2px;
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
  width: calc(100% - 32px);
  /* background-color: white; */
  font-weight: 600;
  padding: 4px 8px;
  margin: 4px 16px 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BlockManagementButton = styled.a`
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colors.black4};
`;
