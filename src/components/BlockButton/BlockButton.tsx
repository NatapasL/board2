import { observer } from 'mobx-react-lite';
import { ReactElement, useContext } from 'react';

import { TYPE_USER } from 'src/constants/blockedStore';
import { storesContext } from 'src/contexts/storesContext';
import { Button } from './styled';

interface BlockButtonProps {
  userId: string;
}

export const BlockButton = observer(({ userId }: BlockButtonProps): ReactElement => {
  const { blockStore } = useContext(storesContext);

  const onClick = (): void => {
    if (confirm(`Block user "${userId}"?`)) {
      blockStore.addToList(TYPE_USER, userId);
    }
  };

  return <Button onClick={(): void => onClick()}>BLOCK</Button>;
});
