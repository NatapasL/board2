import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { TYPE_USER } from 'src/constants/blockedStore';
import { storesContext } from 'src/contexts/storesContext';
import { Button } from './styled';

export const BlockButton = observer(({ userId }) => {
  const { blockStore } = useContext(storesContext);

  const onClick = () => {
    if (confirm(`Block user "${userId}"?`)) {
      blockStore.addToList(TYPE_USER, userId);
    }
  };

  return <Button onClick={() => onClick()}>BLOCK</Button>;
});
