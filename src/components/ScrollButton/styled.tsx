import styled from '@emotion/styled';

interface ContainerProps {
  active?: boolean;
}

export const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 8px;
  transform: ${(props: ContainerProps): string => (props.active ? 'translateY(0)' : 'translateY(calc(100% + 24px))')};
  background-color: rgba(237, 239, 241, 0.75);
  display: flex;

  transition: transform 250ms linear;
`;

export const ArrowContainer = styled.a`
  padding: 4px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  &:first-of-type {
    border-right: 1px solid rgba(110, 120, 129, 0.35);
  }
`;
