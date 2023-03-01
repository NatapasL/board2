import { Global } from '@emotion/core';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';

import { AppProps } from 'next/app';
import { storesContext } from '../contexts/storesContext';
import { globalStyle } from '../styles/global';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter();
  const { boardStore, topicStore } = useContext(storesContext);
  const { board, topic } = router.query;

  useEffect(() => {
    if (!board) return;

    boardStore.setCurrentBoard(board);
  }, [board]);

  useEffect(() => {
    if (!topic) return;

    topicStore.setCurrentTopic(topic);
  }, [topic]);

  return (
    <>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
