import { observer } from 'mobx-react-lite';
import { ReactElement } from 'react';

import { Backdrop, Content } from './styled';

interface SideBarProps {
  active: boolean;
}

export const SideBar = observer(
  ({ active }: SideBarProps): ReactElement => (
    <>
      <Backdrop active={active}></Backdrop>
      <Content>
        <div id="side_bar_content"></div>
      </Content>
    </>
  )
);

export default SideBar;
