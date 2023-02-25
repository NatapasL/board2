import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { storesContext } from '../../contexts/storesContext';
import {
  Container,
  BreadcrumbContainer,
  BreadcrumbLabel,
  LeftContainer,
  BackButton,
  MenuButton,
  RightContainer,
} from './styled';
import { SideBar } from '../SideBar';

export const TopBar = observer(({ onMenuButtonClick }) => {
  const router = useRouter();
  const { boardStore, topicStore } = useContext(storesContext);
  const { board, topic } = router.query;

  let currentBoard;
  if (boardStore.currentBoard && boardStore.currentBoard.slug == board) {
    currentBoard = boardStore.currentBoard;
  }

  let currentTopic;
  if (topicStore.currentTopic && Number(topicStore.currentTopic.id) === Number(topic)) {
    currentTopic = topicStore.currentTopic;
  }

  const renderBreadcrumb = () => {
    return (
      <BreadcrumbContainer>
        {currentBoard && (
          <>
            <Link href={`/boards?board=${currentBoard.slug}`} passHref>
              <BreadcrumbLabel>
                {currentBoard.slug}
              </BreadcrumbLabel>
            </Link>
            {currentTopic && (
              <>
                {' | '}
                <BreadcrumbLabel>
                  {currentTopic.id}
                </BreadcrumbLabel>
              </>
            )}
          </> 
        )}
      </BreadcrumbContainer>
    );
  };

  const renderBackButton = () => {
    return (
      <BackButton onClick={() => router.back()}>
        BACK
      </BackButton>
    );
  };

  return (
    <Container>
      <LeftContainer>
        {renderBackButton()}
        {renderBreadcrumb()}
      </LeftContainer>
      {!currentTopic && (
        <div>
          Kyou mo kawaii!
        </div>
      )}
      <RightContainer>
        <MenuButton onClick={onMenuButtonClick}>
          BOARD LIST
        </MenuButton>
      </RightContainer>
    </Container>
  );
});

TopBar.defaultProps = { onMenuButtonClick: () => {} };