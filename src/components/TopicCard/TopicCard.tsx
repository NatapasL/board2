import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ForwardedRef, forwardRef, MouseEventHandler, ReactElement } from 'react';
import { Topic } from 'src/models';
import { Container, Footer, Header, Title } from './styled';

dayjs.extend(relativeTime);

interface TopicCardProps {
  topic: Topic;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

const TopicCardComponent = (
  { topic, href, onClick, className }: TopicCardProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement => {
  const displayHref = href?.replace(/\?.*/, '').replace(/^\//, '');
  const timeDiff = dayjs(topic.posted_at).fromNow();

  return (
    <Container href={href} onClick={onClick} ref={ref} className={className}>
      <Header>
        {topic.id} • {timeDiff}
      </Header>
      <Title>{topic.title}</Title>
      <Footer>
        Total of <b>{topic.post_count} posts</b>
      </Footer>
    </Container>
  );
};

export const TopicCard = forwardRef<HTMLAnchorElement, TopicCardProps>(TopicCardComponent);
