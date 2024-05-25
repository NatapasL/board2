import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { ReactElement, useContext } from 'react';
import { SCROLL_ID_BOTTOM, SCROLL_ID_TOP } from 'src/constants/scrollId';
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

  const handleClickArrowContainer = (scrollId: string): void => {
    document.getElementById(scrollId)?.scrollIntoView({ behavior: 'instant' });
  };

  return (
    <Container active={active}>
      <RefreshButton onClick={handleClickRefresh}>⟳</RefreshButton>
      <ArrowContainer onClick={(): void => handleClickArrowContainer(SCROLL_ID_TOP)}>↑</ArrowContainer>
      <ArrowContainer onClick={(): void => handleClickArrowContainer(SCROLL_ID_BOTTOM)}>↓</ArrowContainer>
    </Container>
  );
});
