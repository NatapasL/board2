import { observer } from 'mobx-react-lite';
import { useContext } from 'react';

import { Layout } from 'src/components/Layout';
import { TYPE_USER } from 'src/constants/blockedStore';
import { storesContext } from 'src/contexts/storesContext';

export default observer(() => {
  const { blockStore } = useContext(storesContext);

  if (typeof window === 'undefined') {
    return (
      <Layout>
        <div />
      </Layout>
    );
  }

  const { blockedList } = blockStore;

  const unblock = (id: string): void => {
    blockStore.deleteFromList(TYPE_USER, id);
  };

  return (
    <Layout>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TYPE</th>
            <th>DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(blockedList).map(key => (
            <tr key={key}>
              <td>{blockedList[key].id}</td>
              <td>{blockedList[key].type}</td>
              <td>{new Date(blockedList[key].createdAt).toLocaleString()}</td>
              <td>
                <button onClick={(): void => unblock(blockedList[key].id)}>UNBLOCK</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
});
