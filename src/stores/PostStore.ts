import { action, observable } from 'mobx';
import { getAllPosts, getRecentPosts } from 'src/api/postApi';
import { hideSpinner, showSpinner } from 'src/components/Spinner';
import { Post } from 'src/models';

const FETCH_ALL = 'all' as const;
const FETCH_RECENT = 'recent' as const;

interface LatestFetch {
  fetchType?: typeof FETCH_ALL | typeof FETCH_RECENT;
  topicId?: string;
}

class PostStore {
  @observable posts?: Post[];
  private latestFetch: LatestFetch = {};

  @action
  setPosts(posts: Post[]): void {
    this.posts = posts;
  }

  getPost = (postNumber: number): Post | undefined => this.posts?.find(post => post.number === postNumber);

  @action
  fetchRecentPosts(topicId: string): Promise<void> {
    this.latestFetch = { fetchType: FETCH_RECENT, topicId };

    showSpinner();

    return getRecentPosts(topicId).then(({ data }) => {
      this.posts = data.posts;
      hideSpinner();
    });
  }

  @action
  fetchAllPosts(topicId: string): Promise<void> {
    this.latestFetch = { fetchType: FETCH_ALL, topicId };

    showSpinner();

    return getAllPosts(topicId).then(({ data }) => {
      this.posts = data;
      hideSpinner();
    });
  }

  @action
  refreshPost(): Promise<void> {
    if (!this.latestFetch.topicId || !this.latestFetch.fetchType) return Promise.reject();

    switch (this.latestFetch.fetchType) {
      case FETCH_ALL:
        return this.fetchAllPosts(this.latestFetch.topicId);
      case FETCH_RECENT:
        return this.fetchRecentPosts(this.latestFetch.topicId);
    }
  }
}

export default PostStore;
