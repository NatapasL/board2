import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import {
  useContext, useEffect, useState
} from 'react';

import { getAllPosts, getRecentPosts } from 'src/api/postApi';
import { Layout } from 'src/components/Layout';
import { hideSpinner, showSpinner } from 'src/components/Spinner';
import { TopicPage } from 'src/components/TopicPage';
import { storesContext } from 'src/contexts/storesContext';

export default observer(() => {
  const router = useRouter();
  const { postStore } = useContext(storesContext);
  const [isRecent, setIsRecent] = useState();
  const { posts } = postStore;

  const fetchData = (topic, recent) => {
    postStore.setPosts([]);
    showSpinner();

    if (recent) {
      getRecentPosts(topic)
        .then(({ data }) => {
          postStore.setPosts(data.posts);
          hideSpinner();
        });
    } else {
      getAllPosts(topic)
        .then(({ data }) => {
          postStore.setPosts(data);
          hideSpinner();
        });
    }
  };

  useEffect(() => {
    postStore.setPosts([]);
  }, []);

  useEffect(() => {
    if (!window) return;

    const { topic, recent } = router.query;
    if (!topic) return;

    setIsRecent(!!recent);
    fetchData(topic, !!recent);
  }, [router.query]);

  return (
    <Layout>
      {!!posts && (
        <TopicPage posts={posts} isRecent={isRecent} />
      )}
    </Layout>
  );
});
