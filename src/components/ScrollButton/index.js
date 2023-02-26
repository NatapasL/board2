import { Container, ArrowContainer } from './styled';

export const ScrollButton = ({ active }) => {
  return (
    <Container active={active}>
      <ArrowContainer href="#top">↑</ArrowContainer>
      <ArrowContainer href="#bottom">↓</ArrowContainer>
    </Container>
  );
};
