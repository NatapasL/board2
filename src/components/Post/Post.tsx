import dayjs from 'dayjs';
import processString from 'react-process-string';

import { ReactElement } from 'react';
import { Post as PostModel } from 'src/models';
import { URL_REGEX } from '../../constants/regex';
import { PostNavigateLink } from '../PostNavigateLink';
import { IdentityInfo, PostBodyContainer, PostContainer, PostInfoContainer } from './styled';

interface PostProps {
  post: PostModel;
}

export const Post = ({ post }: PostProps): ReactElement => {
  const parseTime = (time: string): string => dayjs(time).format('DD/MM/YYYY HH:mm:ss');

  const formatPostBody = (text: string): string => {
    const config = [
      {
        regex: URL_REGEX,
        fn: (key: string, result: string[]) => (
          <a key={key} href={result[0]}>
            {result[0]}
          </a>
        ),
      },
      {
        regex: />>(\d{1,4})/,
        fn: (key: string, result: string[]) => <PostNavigateLink key={key} postNumber={Number(result[1])} />,
      },
    ];

    return processString(config)(text);
  };

  return (
    <PostContainer id={`${post.number}`}>
      <PostInfoContainer>
        <div>
          <div>No.{post.number}</div>
          <div>{parseTime(post.created_at)}</div>
        </div>
        <IdentityInfo>{post.ident}</IdentityInfo>
      </PostInfoContainer>
      <PostBodyContainer>{formatPostBody(post.body)}</PostBodyContainer>
    </PostContainer>
  );
};
