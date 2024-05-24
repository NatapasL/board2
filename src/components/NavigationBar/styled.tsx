import styled from '@emotion/styled';

import { colors } from '../../styles/variables';

export const Container = styled.div`
  /* background-color: #141518; */
  background-color: ${colors.grey};
  position: sticky;
  bottom: 0;
  color: #fff;
  padding: 8px 16px;
  display: grid;
  grid-template-columns: 37px 1fr 62px;
  height: 48px;
  grid-column-gap: 8px;
  align-items: flex-start;
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 6px;
`;

export const RightContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 4px;
`;

export const BreadcrumbContainer = styled.div`
  height: 100%;
  margin-left: 8px;
  display: flex;
  column-gap: 4px;
  align-items: center;
  max-height: 20px;
`;

export const BreadcrumbLabel = styled.a`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  color: ${colors.black1};
  display: flex;
  height: 20px;
`;

export const ActionButton = styled.a`
  display: flex;
  height: 100%;
  align-items: center;
  font-weight: 600;
  color: ${colors.black5};
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

interface BackButtonProps {
  transparent?: boolean;
}

export const BackButton = styled(ActionButton)`
  padding-right: 8px;
  ${(props: BackButtonProps): string => (props.transparent ? `opacity: 0;` : '')}
`;

export const MenuButton = styled(ActionButton)``;
