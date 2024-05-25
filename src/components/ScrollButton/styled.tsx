import styled, { css } from 'styled-components';

interface ContainerProps {
  active?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 50px;
  right: 2px;
  transform: ${(props): string => (props.active ? 'translateY(0)' : 'translateY(calc(100% + 24px))')};
  background-color: rgba(237, 239, 241, 0.75);
  display: flex;

  transition: transform 250ms linear;
`;

const button = css`
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const buttonBorderRight = css`
  border-right: 1px solid rgba(110, 120, 129, 0.35);
`;

export const ArrowContainer = styled.a`
  ${button}

  &:first-of-type {
    ${buttonBorderRight}
  }
`;

export const RefreshButton = styled.button`
  border: none;
  line-height: 1;
  ${button}
  ${buttonBorderRight}
`;
