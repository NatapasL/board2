import { ReactElement } from 'react';
import { BlockItem } from 'src/stores/BlockStore';
import { BlockTableHeader } from './BlockTableHeader';

interface BlockTableProps {
  blockedList: { [s: string]: BlockItem };
  onUnblock?: (id: string) => void;
}

export const BlockTable = ({ blockedList, onUnblock }: BlockTableProps): ReactElement => (
  <table>
    <BlockTableHeader />
    <tbody>
      {Object.keys(blockedList).map(key => {
        const blockedItem = blockedList[key];

        return (
          <tr key={key}>
            <td>{blockedItem.id}</td>
            <td>{blockedItem.type}</td>
            <td>{new Date(blockedItem.createdAt).toLocaleString()}</td>
            <td>
              <button onClick={(): void => onUnblock?.(blockedItem.id)}>UNBLOCK</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
