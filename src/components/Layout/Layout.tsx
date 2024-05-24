import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useState } from 'react';

import { ScrollButton } from 'src/components/ScrollButton';
import { Spinner } from 'src/components/Spinner';
import { storesContext } from 'src/contexts/storesContext';
import { NavigationBar } from '../NavigationBar';
import { SideBar } from '../SideBar';
import { Background, Container } from './styled';

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  const { boardStore } = useContext(storesContext);
  const router = useRouter();
  const [sideBarActive, setSideBarActive] = useState(false);

  useEffect(() => {
    const isBoardPath = router.route === '/boards';
    const hasNoQuery = !Object.keys(router.query).length;

    if (isBoardPath && hasNoQuery) {
      setSideBarActive(true);
    } else {
      setSideBarActive(false);
    }
  }, [router.asPath]);

  return (
    <>
      <Background>
        <div id="top" />
        <Container>{children}</Container>
        <div id="bottom" />
      </Background>
      <SideBar active={sideBarActive} />
      <ScrollButton active={!sideBarActive} />
      <Spinner />
      <NavigationBar onMenuButtonClick={(): void => setSideBarActive(!sideBarActive)} />
    </>
  );
};
