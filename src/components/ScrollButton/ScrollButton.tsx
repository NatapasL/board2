import { ReactElement } from 'react';
import { ArrowContainer, Container } from './styled';

interface ScrollButtonProps {
  active: boolean;
}

export const ScrollButton = ({ active }: ScrollButtonProps): ReactElement => (
  <Container active={active}>
    <ArrowContainer href="#top">↑</ArrowContainer>
    <ArrowContainer href="#bottom">↓</ArrowContainer>
  </Container>
);
