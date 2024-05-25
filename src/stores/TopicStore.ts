import { action, observable } from 'mobx';
import { getAllTopics, getRecentTopics, getTopic } from 'src/api/topicApi';
import { hideSpinner, showSpinner } from 'src/components/Spinner';
import { Topic } from 'src/models';

const FETCH_ALL = 'all' as const;
const FETCH_RECENT = 'recent' as const;
const FETCH_CURRENT = 'current' as const;

interface LatestFetch {
  fetchType?: typeof FETCH_ALL | typeof FETCH_RECENT | typeof FETCH_CURRENT;
  topicId?: string;
  boardSlug?: string;
}

class TopicStore {
  @observable topics?: Topic[];
  @observable currentTopic?: Topic;

  private latestFetch: LatestFetch = {};

  @action
  setTopics(topics: Topic[]): void {
    this.topics = topics;
  }

  @action
  setCurrentTopic(id: string): Promise<void> {
    const topic = this.topics?.find(topic => Number(topic.id) === Number(id));
    if (topic) {
      this.latestFetch = { fetchType: FETCH_CURRENT, topicId: id };
      this.currentTopic = topic;
      return Promise.resolve();
    }

    return this.fetchCurrentTopic(id);
  }

  @action
  fetchCurrentTopic(id: string): Promise<void> {
    this.latestFetch = { fetchType: FETCH_CURRENT, topicId: id };

    showSpinner();

    return getTopic(id).then(({ data }) => {
      this.currentTopic = data;
      this.topics = [data];
      hideSpinner();
    });
  }

  @action
  fetchAllTopics(boardSlug: string): Promise<void> {
    this.latestFetch = { fetchType: FETCH_ALL, boardSlug };

    showSpinner();

    return getAllTopics(boardSlug).then(({ data }) => {
      this.topics = data;
      hideSpinner();
    });
  }

  @action
  fetchRecentTopics(boardSlug: string): Promise<void> {
    this.latestFetch = { fetchType: FETCH_RECENT, boardSlug };

    showSpinner();

    return getRecentTopics(boardSlug).then(({ data }) => {
      this.topics = data.topics;
      hideSpinner();
    });
  }

  @action
  refreshTopic(): Promise<void> {
    if (!this.latestFetch.fetchType) return Promise.reject();

    switch (this.latestFetch.fetchType) {
      case FETCH_ALL:
        if (!this.latestFetch.boardSlug) return Promise.reject();

        return this.fetchAllTopics(this.latestFetch.boardSlug);
      case FETCH_RECENT:
        if (!this.latestFetch.boardSlug) return Promise.reject();

        return this.fetchRecentTopics(this.latestFetch.boardSlug);
      case FETCH_CURRENT:
        if (!this.latestFetch.topicId) return Promise.reject();

        return this.fetchCurrentTopic(this.latestFetch.topicId);
    }
  }
}

export default TopicStore;
