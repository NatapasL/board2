import {
  action, computed, observable
} from 'mobx';
import { TYPE_USER } from '../constants/blockedStore';

const STORAGE_KEY = 'blockedList';

class BlockStore {
  @observable blockedList: { [s: string]: BlockItem } = this.getFromLocalStorage();

  @action
  addToList(type: string, id: string): void {
    const key = this.generateKey(type, id);
    this.blockedList[key] = {
 id, type, createdAt: new Date().getTime()
};
    this.updateLocalStorage();
  }

  @action
  deleteFromList(type: string, id: string): void {
    const key = this.generateKey(type, id);
    delete this.blockedList[key];
    this.updateLocalStorage();
  }

  @computed
  get userIds(): string[] {
    const ids: string[] = [];
    for(const key in this.blockedList) {
      if (this.blockedList[key].type === TYPE_USER) {
        ids.push(this.blockedList[key].id);
      }
    }

    return ids;
  }

  generateKey(type: string, id: string): string {
    return  `${type}$${id}`;
  }

  getFromLocalStorage(): { [s: string]: BlockItem } {
    const storageData = localStorage.getItem(STORAGE_KEY);

    return storageData ? JSON.parse(storageData) : {};
  }

  updateLocalStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blockedList));
  }
}

export default BlockStore;

interface BlockItem {
  id: string;
  type: string;
  createdAt: number;
}
