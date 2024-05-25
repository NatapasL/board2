import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { useSwipeable } from 'react-swipeable';
import { ScrollButton } from 'src/components/ScrollButton';
import { Spinner } from 'src/components/Spinner';
import { NavigationBar } from '../NavigationBar';
import { SelectBoardSideBar } from '../SelectBoardSideBar';
import { SideBar } from '../SideBar';
import { Background, Container } from './styled';

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
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

  const handlers = useSwipeable({
    onSwipedRight: () => router.back(),
  });

  return (
    <>
      <Background>
        <div id="top" />
        <Container {...handlers}>{children}</Container>
        <div id="bottom" />
      </Background>
      <SideBar active={sideBarActive} />
      <SelectBoardSideBar active={sideBarActive}></SelectBoardSideBar>
      <ScrollButton active={!sideBarActive} />
      <Spinner />
      <NavigationBar onMenuButtonClick={(): void => setSideBarActive(!sideBarActive)} />
    </>
  );
};
