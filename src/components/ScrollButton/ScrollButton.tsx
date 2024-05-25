import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { ReactElement, useContext } from 'react';
import { storesContext } from 'src/contexts/storesContext';
import { ArrowContainer, Container, RefreshButton } from './styled';

interface ScrollButtonProps {
  active: boolean;
}

export const ScrollButton = observer(({ active }: ScrollButtonProps): ReactElement => {
  const router = useRouter();
  const { postStore, topicStore } = useContext(storesContext);

  const handleClickRefresh = (): void => {
    const { board, topic } = router.query;

    if (topic) {
      postStore.refreshPost();
      return;
    }

    if (board) {
      topicStore.refreshTopic();
      return;
    }
  };

  return (
    <Container active={active}>
      <RefreshButton onClick={handleClickRefresh}>⟳</RefreshButton>
      <ArrowContainer href="#top">↑</ArrowContainer>
      <ArrowContainer href="#bottom">↓</ArrowContainer>
    </Container>
  );
});
