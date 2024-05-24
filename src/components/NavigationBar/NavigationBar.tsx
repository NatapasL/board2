import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, ReactElement, useContext } from 'react';

import { Board, Topic } from 'src/models';
import { storesContext } from '../../contexts/storesContext';
import {
  BackButton,
  BreadcrumbContainer,
  BreadcrumbLabel,
  Container,
  LeftContainer,
  MenuButton,
  RightContainer,
} from './styled';

interface NavigationBarProps {
  onMenuButtonClick: MouseEventHandler<HTMLAnchorElement>;
}

export const NavigationBar = observer(({ onMenuButtonClick = (): void => undefined }: NavigationBarProps) => {
  const router = useRouter();
  const { boardStore, topicStore } = useContext(storesContext);
  const { board, topic } = router.query;

  let currentBoard: Board;
  if (boardStore.currentBoard && boardStore.currentBoard.slug == board) {
    currentBoard = boardStore.currentBoard;
  }

  let currentTopic: Topic;
  if (topicStore.currentTopic && Number(topicStore.currentTopic.id) === Number(topic)) {
    currentTopic = topicStore.currentTopic;
  }

  const renderBreadcrumb = (): ReactElement => (
    <BreadcrumbContainer>
      {currentBoard && (
        <>
          <Link href={`/boards?board=${currentBoard.slug}`} passHref>
            <BreadcrumbLabel>{currentBoard.slug}</BreadcrumbLabel>
          </Link>
          {currentTopic && (
            <>
              {' | '}
              <BreadcrumbLabel>{currentTopic.id}</BreadcrumbLabel>
            </>
          )}
        </>
      )}
    </BreadcrumbContainer>
  );

  const renderBackButton = () => <BackButton onClick={() => router.back()}>BACK</BackButton>;

  return (
    <Container>
      <LeftContainer>
        {renderBackButton()}
        {renderBreadcrumb()}
      </LeftContainer>
      {/* {!currentTopic && <div>Kyou mo kawaii!</div>} */}
      <RightContainer>
        <MenuButton onClick={onMenuButtonClick}>BOARD LIST</MenuButton>
      </RightContainer>
    </Container>
  );
});
