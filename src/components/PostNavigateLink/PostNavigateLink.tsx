import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';

import { storesContext } from '../../contexts/storesContext';
import { Post } from '../Post';
import { Container, LinkContainer, PopupContainer } from './styled';

interface PostNavigateLinkProps {
  postNumber: number;
}

export const PostNavigateLink = observer(({ postNumber }: PostNavigateLinkProps) => {
  const { postStore } = useContext(storesContext);
  const [active, setActive] = useState(false);

  const post = postStore.getPost(Number(postNumber));

  return (
    <Container onMouseEnter={(): void => setActive(true)} onMouseLeave={(): void => setActive(false)}>
      <LinkContainer href={`#${postNumber}`}>#{postNumber}</LinkContainer>
      {post && active && (
        <PopupContainer>
          <Post post={post} />
        </PopupContainer>
      )}
    </Container>
  );
});
