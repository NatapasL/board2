import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { ReactElement, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { storesContext } from '../../contexts/storesContext';
import {
  BlockManagementButton,
  Container,
  ItemContainer,
  ItemLeftText,
  ItemRightText,
  LinkButton,
  ListContainer,
  SelectBar,
} from './styled';

interface SelectBoardSideBarProps {
  active: boolean;
}

export const SelectBoardSideBar = observer(({ active }: SelectBoardSideBarProps): ReactElement => {
  const { boardStore } = useContext(storesContext);

  useEffect(() => {
    boardStore.fetchBoardList();
  }, []);

  if (!boardStore.boardList.length) {
    return <div>Loading...</div>;
  }

  return createPortal(
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
    </Container>,
    document.querySelector('#side_bar_content') as HTMLElement
  );
});

export default SelectBoardSideBar;
