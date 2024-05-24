import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { ScrollButton } from 'src/components/ScrollButton';
import { Spinner } from 'src/components/Spinner';
import { NavigationBar } from '../NavigationBar';
import { SideBar } from '../SideBar';
import { Background, Container } from './styled';

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  const router = useRouter();
  const [sideBarActive, setSideBarActive] = useState(false);

  useEffect(() => {
    if (router.route === '/') {
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
