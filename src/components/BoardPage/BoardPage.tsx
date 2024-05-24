import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ReactElement, useContext } from 'react';

import { Topic } from 'src/models';
import { storesContext } from '../../contexts/storesContext';
import { Button } from '../Button';
import { Body, ButtonContainer, Header, HeaderContent, StyledTopicCard, Title } from './styled';

interface BoardPageProps {
  topics: Topic[];
  isAll?: boolean;
}

export const BoardPage = observer(({ topics, isAll }: BoardPageProps): ReactElement => {
  const { boardStore } = useContext(storesContext);
  const board = boardStore.currentBoard;

  if (!board) return <div />;

  const renderSeeAllButton = () => {
    if (isAll) return <div />;

    return (
      <Link href={`/boards?board=${board.slug}&all=true`} passHref>
        <Button type="see_all">+ ALL TOPICS</Button>
      </Link>
    );
  };

  return (
    <>
      <Header>
        <Title>
          <h1>/{board.slug}</h1>
        </Title>
        <HeaderContent>
          <b>{board.title}</b> <br />
          {board.description}
          <ButtonContainer>{renderSeeAllButton()}</ButtonContainer>
        </HeaderContent>
      </Header>
      <Body>
        {topics.map(topic => (
          <Link key={topic.id} href={`/boards/topics?board=${board.slug}&topic=${topic.id}&recent=true`} passHref>
            <StyledTopicCard topic={topic} />
          </Link>
        ))}
        <ButtonContainer center>{renderSeeAllButton()}</ButtonContainer>
      </Body>
    </>
  );
});
