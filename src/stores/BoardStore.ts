import { action, computed, observable } from 'mobx';
import BOARD_LIST_JSON from '../json/boards.json';

import { Board } from 'src/models';

const BOARD_LIST: Board[] = BOARD_LIST_JSON;

class BoardStore {
  @observable boardList: Board[] = [];
  @observable currentBoardSlug?: string;

  @action
  fetchBoardList(): void {
    if (this.boardList.length) return;

    this.boardList = BOARD_LIST;
  }

  @action
  setCurrentBoard(slug: string): void {
    this.currentBoardSlug = slug;
  }

  @computed
  get currentBoard(): Board | undefined {
    return this.boardList.find(board => board.slug === this.currentBoardSlug);
  }
}

export default BoardStore;
