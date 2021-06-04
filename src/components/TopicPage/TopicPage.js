import { useContext, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

import { storesContext } from '../../contexts/storesContext'
import { 
  Header,
  Title,
  FirstPostCard,
  ButtonContainer,
  FilterContainer,
  Body,
  StyledPostCard,
} from './styled'
import { Button } from '../Button'

export const TopicPage = observer(({ posts, isRecent }) => {
  const router = useRouter()
  const [activePostNumber, setActivePostNumber] = useState(-1)
  
  const { topicStore, boardStore } = useContext(storesContext)
  const topic = topicStore.currentTopic
  const board = boardStore.currentBoard

  const postNumbers = useMemo(() => posts.map(post => post.number), [JSON.stringify(posts)])

  useEffect(() => {
    const s = router.asPath.match(/activePost=(\d{1,4})/)
    if (s?.[1] ?? false) {
      setActivePostNumber(Number(s[1]))
    } else {
      setActivePostNumber(-1)
    }
  }, [router.asPath])

  useEffect(() => {
    if (activePostNumber === -1) {
      return null
    }

    if (!postNumbers.includes(activePostNumber)) {
      const asPath = router.asPath.replace(/&recent=[^&]*/, '')
      router.replace(asPath, asPath, { scroll: false })
    }
    
    scrollToPost()
  }, [activePostNumber, JSON.stringify(posts)])

  const scrollToPost = () => {
    const el = document.getElementById(`post_${activePostNumber}`)
    if (!el) {
      return null
    }
    el.scrollIntoView({ block: 'center' })

    setTimeout(() => {
      const asPath = router.asPath.replace(/&activePost=[^&]*/, '')
      router.replace(router.route, asPath, { scroll: false })
    }, 3000)
  }

  if (!topic || !board) return <div />

  const filteredPosts = isRecent ? posts : posts.filter(post => Number(post.number) > 1)

  const renderSeeAllButton = (center) => {
    if (!isRecent) return <div />

    return (
      <ButtonContainer center={center}>
        <Link href={`/boards/topics?board=${board.slug}&topic=${topic.id}`} passHref>
          <Button type="see_all">
            + ALL POSTS
          </Button>
        </Link>
      </ButtonContainer>
    )
  }

  const renderFirstPost = () => {
    const firstPost = posts.find(post => Number(post.number) === 1)
    if (!firstPost) return <div />

    return (
      <FirstPostCard post={firstPost} first />
    )
  }

  return (
    <>
      <Header>
        <Title>{topic.title}</Title>
        {!isRecent && renderFirstPost()}
        {renderSeeAllButton()}
      </Header>
      <FilterContainer>
        { isRecent ? 'LATEST POSTS' : 'ALL POSTS' }
      </FilterContainer>
      <Body>
        {filteredPosts.map(post => 
          <StyledPostCard 
            key={post.id} 
            post={post} 
            active={post.number === activePostNumber} 
          />
        )}
        {renderSeeAllButton(true)}
      </Body>
    </>
  )
})