import { action, observable } from 'mobx';
import { getTopic } from 'src/api/topicApi';
import { hideSpinner, showSpinner } from 'src/components/Spinner';
import { Topic } from 'src/models';

class TopicStore {
  @observable topics?: Topic[];
  @observable currentTopic?: Topic;

  @action
  setTopics(topics: Topic[]): void {
    this.topics = topics;
  }

  @action
  setCurrentTopic(id: string): void {
    const topic = this.topics?.find(topic => Number(topic.id) === Number(id));
    if (topic) {
      this.currentTopic = topic;
      return;
    }

    showSpinner();
    getTopic(id).then(({ data }) => {
      this.currentTopic = data;
      this.topics = [data];
      hideSpinner();
    });
  }
}

export default TopicStore;
