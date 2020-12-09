import { createContext } from 'react'

import BoardStore from 'src/stores/BoardStore'
import TopicStore from 'src/stores/TopicStore'
import PostStore from 'src/stores/PostStore'

export const storesContext = createContext({
  boardStore: new BoardStore(),
  topicStore: new TopicStore(),
  postStore: new PostStore()
})