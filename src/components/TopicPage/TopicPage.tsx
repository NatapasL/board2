import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useMemo, useState } from 'react';

import { Post } from 'src/models';
import { storesContext } from '../../contexts/storesContext';
import { Button } from '../Button';
import { Body, ButtonContainer, FilterContainer, FirstPostCard, Header, StyledPostCard, Title } from './styled';

interface TopicPageProps {
  posts: Post[];
  isRecent: boolean;
}

export const TopicPage = observer(({ posts, isRecent }: TopicPageProps) => {
  const router = useRouter();
  const [activePostNumber, setActivePostNumber] = useState(-1);

  const { topicStore, boardStore, blockStore } = useContext(storesContext);
  const topic = topicStore.currentTopic;
  const board = boardStore.currentBoard;

  const postNumbers = useMemo(() => posts.map(post => post.number), [JSON.stringify(posts)]);

  useEffect(() => {
    const activePostRegexpMatch = router.asPath.match(/activePost=(\d{1,4})/);
    const activePost = activePostRegexpMatch?.[1];

    if (typeof activePost === 'string') {
      setActivePostNumber(Number(activePost));
    } else {
      setActivePostNumber(-1);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (activePostNumber === -1) {
      return undefined;
    }

    if (!postNumbers.includes(activePostNumber)) {
      const asPath = router.asPath.replace(/&recent=[^&]*/, '');
      router.replace(asPath, asPath, { scroll: false });
    }

    scrollToPost();

    return undefined;
  }, [activePostNumber, JSON.stringify(posts)]);

  const scrollToPost = () => {
    const el = document.getElementById(`post_${activePostNumber}`);
    if (!el) {
      return null;
    }
    el.scrollIntoView({ block: 'center' });

    setTimeout(() => {
      const asPath = router.asPath.replace(/&activePost=[^&]*/, '');
      router.replace(router.route, asPath, { scroll: false });
    }, 2000);

    return undefined;
  };

  const filteredPosts = useMemo(() => {
    let result = isRecent ? posts : posts.filter(post => Number(post.number) > 1);
    result = result.filter(post => !blockStore.userIds.includes(post.ident));

    return result;
  }, [isRecent, JSON.stringify(posts || []), JSON.stringify(blockStore.userIds)]);

  if (!topic || !board) return <div />;

  const renderSeeAllButton = (center?: boolean): ReactElement => {
    if (!isRecent) return <div />;

    return (
      <ButtonContainer center={center}>
        <Link href={`/boards/topics?board=${board.slug}&topic=${topic.id}`} passHref>
          <Button type="see_all">+ ALL POSTS</Button>
        </Link>
      </ButtonContainer>
    );
  };

  const renderFirstPost = () => {
    const firstPost = posts.find(post => Number(post.number) === 1);
    if (!firstPost) return <div />;

    return <FirstPostCard post={firstPost} first />;
  };

  return (
    <>
      <Header>
        <Title>{topic.title}</Title>
        {!isRecent && renderFirstPost()}
        {renderSeeAllButton()}
      </Header>
      <FilterContainer>{isRecent ? 'LATEST POSTS' : 'ALL POSTS'}</FilterContainer>
      <Body>
        {filteredPosts.map(post => (
          <StyledPostCard key={post.id} post={post} active={post.number === activePostNumber} />
        ))}
        {renderSeeAllButton(true)}
      </Body>
    </>
  );
});
