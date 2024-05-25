import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';

import { AppProps } from 'next/app';
import { storesContext } from '../contexts/storesContext';
import { GlobalStyle } from '../styles/global';

import React from 'react';

React.useLayoutEffect = React.useEffect;

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter();
  const { boardStore, topicStore } = useContext(storesContext);
  const { board, topic } = router.query;

  useEffect(() => {
    if (typeof board !== 'string') return;

    boardStore.setCurrentBoard(board);
  }, [board, boardStore]);

  useEffect(() => {
    if (typeof topic !== 'string') return;

    topicStore.setCurrentTopic(topic);
  }, [topic, topicStore]);

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default App;
