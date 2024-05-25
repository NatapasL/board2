import { action, observable } from 'mobx';
import { getAllTopics, getRecentTopics, getTopic } from 'src/api/topicApi';
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
  setCurrentTopic(id: string): Promise<void> {
    const topic = this.topics?.find(topic => Number(topic.id) === Number(id));
    if (topic) {
      this.currentTopic = topic;
      return Promise.resolve();
    }

    return this.fetchCurrentTopic(id);
  }

  @action
  fetchCurrentTopic(id: string): Promise<void> {
    showSpinner();

    return getTopic(id).then(({ data }) => {
      this.currentTopic = data;
      this.topics = [data];
      hideSpinner();
    });
  }

  @action
  fetchAllTopics(board: string): Promise<void> {
    showSpinner();

    return getAllTopics(board).then(({ data }) => {
      this.topics = data;
      hideSpinner();
    });
  }

  @action
  fetchRecentTopics(board: string): Promise<void> {
    showSpinner();

    return getRecentTopics(board).then(({ data }) => {
      this.topics = data.topics;
      hideSpinner();
    });
  }
}

export default TopicStore;
