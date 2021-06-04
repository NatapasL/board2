import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import processString from 'react-process-string'

import { URL_REGEX } from '../../constants/regex'
import { BlockButton } from '../BlockButton'
import { 
  Container,
  ActiveContainer,
  Header,
  Body,
  StyledA,
  PostLink,
  PostNumber,
  Footer
} from './styled'

dayjs.extend(relativeTime)

export const PostCard = ({ post, className, first, active }) => {
  const router = useRouter()

  const displayCreatedAt = () => {
    const createdAt = dayjs(post.created_at)
    const isToday = createdAt.add(23, 'hour').isAfter(dayjs())

    return isToday ? createdAt.fromNow(true) : createdAt.format('DD/MM/YY HH:mm:ss')
  }

  const formatPostBody = (text) => {
    const config = [
      {
        regex: URL_REGEX,
        fn: (key, result) => (
          <StyledA key={key} href={result[0]} target={'_blank'}>
            {result[0]}
          </StyledA>
        )
      },
      {
        regex: />>(\d{1,4})/,
        fn: (key, result) => (
          <PostLink 
            key={key} 
            onClick={() => linkToPost(result[1])}
          >
            ↑{Number(result[1])}
          </PostLink>
        )
      },
      {
        regex: />>>(\/[^\/]+\/\d+(\/\d{1,4})?)/,
        fn: (key, result) => (
          <PostLink 
            key={key}
            onClick={() => linkToOtherTopicPost(result[1])}
          >
            →{result[1]}
          </PostLink>
        )
      }
    ]

    return processString(config)(text)
  }

  const linkToPost = (number) => {
    const asPath = router.asPath.replace(/($|&activePost=[^&]*)/, `&activePost=${number}`)
    router.push(router.route, asPath, { scroll: false })
  }

  const linkToOtherTopicPost = (path) => {
    const regex = /\/([^\/]+)\/(\d+)(\/(\d{1,4}))?/
    const matched = path.match(regex)
    if (!matched) {
      return
    }

    const [, board, topic, , post] = matched
    const url = `/boards/topics?board=${board}&topic=${topic}&${post ? `activePost=${post}` : 'recent=true'}`
    router.push(url)
  }

  const ContainerComponent = active ? ActiveContainer : Container

  return (
    <ContainerComponent 
      id={`post_${post.number}`}
      className={className} 
    >
      <Header>
        
        {!first && (
          <>
            <PostNumber>{post.number}</PostNumber>
            :{post.ident}
            {' • '}
          </>
        )}
        {displayCreatedAt()}
        &nbsp;&nbsp;❯&nbsp;&nbsp;
        <BlockButton userId={post.ident} />
      </Header>
      <Body>
        {formatPostBody(post.body)}
      </Body>
    </ContainerComponent>
  )
}