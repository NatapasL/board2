import { useContext } from 'react';

import { storesContext } from 'src/contexts/storesContext';

export const useStore = () => {
  const context = useContext(storesContext);

  return context;
};
