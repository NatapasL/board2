import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { ScrollButton } from 'src/components/ScrollButton';
import { Spinner } from 'src/components/Spinner';
import { SideBar } from '../SideBar';
import { TopBar } from '../TopBar';
import { Background, Container } from './styled';

interface LayoutProps {
  children: ReactElement;
}

export const Layout = ({ children }: LayoutProps) => {
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
