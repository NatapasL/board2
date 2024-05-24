import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ReactElement, useContext, useEffect } from 'react';

import { storesContext } from '../../contexts/storesContext';
import {
  Backdrop,
  BlockManagementButton,
  Container,
  ItemContainer,
  ItemLeftText,
  ItemRightText,
  LinkButton,
  ListContainer,
  SelectBar,
} from './styled';

interface SideBarProps {
  active: boolean;
}

export const SideBar = observer(({ active }: SideBarProps): ReactElement => {
  const { boardStore } = useContext(storesContext);

  useEffect(() => {
    boardStore.fetchBoardList();
  }, []);

  if (!boardStore.boardList.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Backdrop active={active}></Backdrop>
      <Container active={active} boardLength={boardStore.boardList.length}>
        <SelectBar>
          Select Board
          <BlockManagementButton href={'/blocks'}>❯ BLOCK MANAGEMENT</BlockManagementButton>
        </SelectBar>
        <ListContainer>
          {boardStore.boardList.map(board => (
            <Link key={board.id} href={`/boards?board=${board.slug}`} passHref>
              <ItemContainer>
                <ItemLeftText>{board.slug}</ItemLeftText>
                <ItemRightText>
                  <LinkButton>{board.title.toUpperCase()}</LinkButton>
                </ItemRightText>
              </ItemContainer>
            </Link>
          ))}
        </ListContainer>
      </Container>
    </>
  );
});

export default SideBar;
