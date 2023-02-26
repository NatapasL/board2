import { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { storesContext } from 'src/contexts/storesContext';
import { Layout } from 'src/components/Layout';
import { BoardPage } from 'src/components/BoardPage';
import { getRecentTopics, getAllTopics } from 'src/api/topicApi';
import { showSpinner, hideSpinner } from 'src/components/Spinner';

export default observer(() => {
  const router = useRouter();
  const { topicStore } = useContext(storesContext);
  const [isAll, setIsAll] = useState();
  const { topics } = topicStore;

  const fetchData = (board, all) => {
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
    if (!board) return;

    setIsAll(!!all);
    fetchData(board, !!all);
  }, [router.query]);

  return (
    <Layout>{!!topics && <BoardPage topics={topics} isAll={isAll} />}</Layout>
  );
});
