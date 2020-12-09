import { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { storesContext } from 'src/contexts/storesContext'
import { Layout } from 'src/components/Layout'
import { TopicPage } from 'src/components/TopicPage'
import { getRecentPosts, getAllPosts } from 'src/api/postApi'
import { showSpinner, hideSpinner } from 'src/components/Spinner'

export default observer(() => {
  const router = useRouter()
  const { postStore } = useContext(storesContext)
  const [isRecent, setIsRecent] = useState()
  const { posts } = postStore

  const fetchData = (topic, recent) => {
    showSpinner()

    if (recent) {
      getRecentPosts(topic)
        .then(({ data }) => {
          postStore.setPosts(data.posts)
          hideSpinner()
        })
    } else {
      getAllPosts(topic)
        .then(({ data }) => {
          postStore.setPosts(data)
          hideSpinner()
        })
    }
  }

  useEffect(() => {
    if (!window) return

    const { topic, recent } = router.query
    if (!topic) return

    setIsRecent(!!recent)
    fetchData(topic, !!recent)
  }, [router.query])

  return (
    <Layout>
      {!!posts && (
        <TopicPage posts={posts} isRecent={isRecent} />
      )}
    </Layout>
  )
})