import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Container, Background } from './styled';
import { SideBar } from '../SideBar';
import { TopBar } from '../TopBar';
import { Spinner } from 'src/components/Spinner';
import { ScrollButton } from 'src/components/ScrollButton';

export const Layout = ({ children }) => {
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
      <TopBar onMenuButtonClick={() => setSideBarActive(!sideBarActive)} />
      <Background>
        <div id="top" />
        <Container>{children}</Container>
        <div id="bottom" />
      </Background>
      <SideBar active={sideBarActive} />
      <ScrollButton active={!sideBarActive} />
      <Spinner />
    </>
  );
};
