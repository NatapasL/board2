import { action, computed, observable } from 'mobx';

import { Board } from 'src/models';

const BOARD_LIST: Board[] = JSON.parse(process.env.NEXT_PUBLIC_BOARD_LIST || `[]`);

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
