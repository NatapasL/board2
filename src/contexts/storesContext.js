import { createContext } from 'react';

import BoardStore from 'src/stores/BoardStore';
import TopicStore from 'src/stores/TopicStore';
import PostStore from 'src/stores/PostStore';
import BlockStore from 'src/stores/BlockStore';

export const storesContext = createContext({
  boardStore: new BoardStore(),
  topicStore: new TopicStore(),
  postStore: new PostStore(),
  blockStore: new BlockStore()
});