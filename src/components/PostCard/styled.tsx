import styled, { keyframes } from 'styled-components';

import { colors } from '../../styles/variables';

const highlight = keyframes`
  0%, 100% {
    background-color: ${colors.white};
  }
  10% {
    background-color: ${colors.highlight};
  }
`;

export const Container = styled.div`
  background-color: ${colors.white};
  padding: 8px 16px;
`;

export const ActiveContainer = styled(Container)`
  animation: ${highlight} 2s;
`;

export const Header = styled.div`
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 8px;
  color: ${colors.black5};
`;

export const PostNumber = styled.span`
  font-weight: 500;
  font-size: 11px;
  color: ${colors.black5};
`;

export const Body = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 16px;
  margin-bottom: 8px;
  line-height: 1.5;
`;

export const StyledA = styled.a`
  color: ${colors.link};
`;

export const PostLink = styled(StyledA)`
  font-size: 14px;
  font-weight: 400;
`;

export const ReplyButton = styled.button`
  box-sizing: border-box;
  font-weight: 500;
  font-size: 10px;
  background-color: ${colors.white};
  display: inline-flex;
  cursor: pointer;
  padding: 4px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: inline-flex;
`;
