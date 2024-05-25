import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { BoardPage } from 'src/components/BoardPage';
import { Layout } from 'src/components/Layout';
import { storesContext } from 'src/contexts/storesContext';

export default observer(() => {
  const router = useRouter();
  const { topicStore } = useContext(storesContext);
  const [isAll, setIsAll] = useState<boolean>();
  const { topics } = topicStore;

  const fetchData = (boardSlug: string, isFetchAllTopic?: boolean): void => {
    topicStore.setTopics([]);

    if (isFetchAllTopic) topicStore.fetchAllTopics(boardSlug);

    topicStore.fetchRecentTopics(boardSlug);
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
