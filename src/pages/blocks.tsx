import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BlockTable } from 'src/components/BlockTable';

import { Layout } from 'src/components/Layout';
import { TYPE_USER } from 'src/constants/blockedStore';
import { storesContext } from 'src/contexts/storesContext';
import { BlockItem } from 'src/stores/BlockStore';

export default observer(() => {
  const { blockStore } = useContext(storesContext);

  const [blockedList, setBlockedList] = useState<{ [s: string]: BlockItem }>({});

  if (typeof window === 'undefined') {
    return (
      <Layout>
        <BlockTable blockedList={{}} />
      </Layout>
    );
  }

  const { blockedList: blockedListFromStore } = blockStore;

  useEffect(() => {
    setBlockedList(blockedListFromStore);
  }, [JSON.stringify(blockedListFromStore)]);

  const unBlock = (id: string): void => {
    blockStore.deleteFromList(TYPE_USER, id);
  };

  return (
    <Layout>
      <BlockTable onUnblock={unBlock} blockedList={blockedList} />
    </Layout>
  );
});
