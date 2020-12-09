import { useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

import { storesContext } from '../../contexts/storesContext'
import {
  Container,
  ItemContainer,
  ListContainer,
  ItemLeftText,
  ItemRightText,
  LinkButton,
} from './styled'

export const SideBar = observer(({ active, onUpdateActive }) => {
  const { boardStore } = useContext(storesContext)

  useEffect(() => {
    boardStore.fetchBoardList()
  }, [])

  if (!boardStore.boardList.length) {
    return <div>Loading...</div>
  }

  return (
    <Container active={active}>
      <ListContainer>
        {boardStore.boardList.map(board => (
          <Link key={board.id} href={`/boards?board=${board.slug}`} passHref>
            <ItemContainer>
              <ItemLeftText>
                : {board.slug}
              </ItemLeftText>
              <ItemRightText>
                <LinkButton>
                  {board.title.toUpperCase()}
                </LinkButton>
              </ItemRightText>
            </ItemContainer>
          </Link>
        ))}
      </ListContainer>
    </Container>
  )
})

export default SideBar
