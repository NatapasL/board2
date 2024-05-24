import EventEmitter from 'eventemitter3';
import { ReactElement, useEffect, useRef, useState } from 'react';

import { Backdrop, Container, SpinnerAnimation, Text } from './styled';

const emitter = new EventEmitter();

export const showSpinner = (): boolean => emitter.emit('showSpinner');
export const hideSpinner = (): boolean => emitter.emit('hideSpinner');

export const Spinner = (): ReactElement => {
  const [active, setActive] = useState(false);
  const count = useRef(0);

  useEffect(() => {
    emitter.on('showSpinner', handleShowSpinner);
    emitter.on('hideSpinner', handleHideSpinner);

    return () => {
      emitter.off('showSpinner');
      emitter.off('hideSpinner');
    };
  }, []);

  const handleShowSpinner = (): void => {
    count.current += 1;

    if (count.current > 0) {
      setActive(true);
    }
  };

  const handleHideSpinner = (): void => {
    count.current -= 1;

    if (count.current < 0) {
      count.current = 0;
    }

    if (count.current == 0) {
      setActive(false);
    }
  };

  return (
    <Backdrop active={active}>
      <Container>
        <SpinnerAnimation />
        <Text>LOADING</Text>
      </Container>
    </Backdrop>
  );
};
