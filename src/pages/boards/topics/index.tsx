import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { Layout } from 'src/components/Layout';
import { TopicPage } from 'src/components/TopicPage';
import { SCROLL_ID_BOTTOM } from 'src/constants/scrollId';
import { storesContext } from 'src/contexts/storesContext';

export default observer(() => {
  const router = useRouter();
  const { postStore } = useContext(storesContext);
  const [isRecent, setIsRecent] = useState<boolean>();
  const { posts } = postStore;

  const fetchData = (topicId: string, recent: boolean | number): void => {
    postStore.setPosts([]);

    if (recent) {
      postStore.fetchRecentPosts(topicId).then(() => {
        setTimeout(() => {
          document.getElementById(SCROLL_ID_BOTTOM)?.scrollIntoView({ behavior: 'instant' });
        });
      });

      return;
    }

    postStore.fetchAllPosts(topicId);
  };

  useEffect(() => {
    postStore.setPosts([]);
  }, []);

  useEffect(() => {
    if (!window) return;

    const { topic, recent } = router.query;
    if (typeof topic !== 'string') return;

    setIsRecent(!!recent);
    fetchData(topic, !!recent);
  }, [router.query]);

  return <Layout>{posts ? <TopicPage posts={posts} isRecent={isRecent} /> : <></>}</Layout>;
});
