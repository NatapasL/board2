import { observable, action } from 'mobx'
import { getTopic } from 'src/api/topicApi'

class TopicStore {
  @observable topics = undefined
  @observable currentTopic

  @action
  setTopics(topics) {
    this.topics = topics
  }

  @action
  setCurrentTopic(id) {
    const topic = this.topics?.find(topic => Number(topic.id) === Number(id))
    if (topic) {
      this.currentTopic = topic
      return
    }

    getTopic(id).then(({ data }) => {
      this.currentTopic = data
      this.topics = [data]
    })
  }
}

export default TopicStore