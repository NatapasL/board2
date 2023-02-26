import { Global } from '@emotion/core';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Global styles={globalStyle} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
