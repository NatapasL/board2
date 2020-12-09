import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { storesContext } from '../../contexts/storesContext'
import { Layout } from '../../components/Layout'
import { BoardPage } from '../../components/BoardPage'
import { getRecentTopics, getAllTopics } from '../../api/topicApi'

export default observer(() => {
  const router = useRouter()
  const { topicStore } = useContext(storesContext)
  const [isAll, setIsAll] = useState()
  const { topics } = topicStore

  const fetchData = (board, all) => {
    if (all) {
      getAllTopics(board)
        .then(({ data }) => topicStore.setTopics(data))
    } else {
      getRecentTopics(board)
        .then(({ data }) => topicStore.setTopics(data.topics))
    }
  }

  useEffect(() => {
    if (!window) return

    const { board, all } = router.query
    if (!board) return

    setIsAll(!!all)
    fetchData(board, !!all)
  }, [router.query])

  return (
    <Layout>
      {!!topics && (
        <BoardPage topics={topics} isAll={isAll} />
      )}
    </Layout>
  )
})