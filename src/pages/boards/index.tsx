import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { getAllTopics, getRecentTopics } from 'src/api/topicApi';
import { BoardPage } from 'src/components/BoardPage';
import { Layout } from 'src/components/Layout';
import { hideSpinner, showSpinner } from 'src/components/Spinner';
import { storesContext } from 'src/contexts/storesContext';

export default observer(() => {
  const router = useRouter();
  const { topicStore } = useContext(storesContext);
  const [isAll, setIsAll] = useState<boolean>();
  const { topics } = topicStore;

  const fetchData = (board: string, all?: boolean): void => {
    topicStore.setTopics([]);
    showSpinner();

    if (all) {
      getAllTopics(board).then(({ data }) => {
        topicStore.setTopics(data);
        hideSpinner();
      });
    } else {
      getRecentTopics(board).then(({ data }) => {
        topicStore.setTopics(data.topics);
        hideSpinner();
      });
    }
  };

  useEffect(() => {
    topicStore.setTopics([]);
  }, []);

  useEffect(() => {
    if (!window) return;

    const { board, all } = router.query;
    if (typeof board !== 'string') return;

    setIsAll(!!all);
    fetchData(board, !!all);
  }, [router.query]);

  return <Layout>{topics ? <BoardPage topics={topics} isAll={isAll} /> : <></>}</Layout>;
});
