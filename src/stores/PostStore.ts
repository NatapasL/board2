import { action, observable } from 'mobx';
import { Post } from 'src/models';

class PostStore {
  @observable posts?: Post[];

  @action
  setPosts(posts: Post[]): void {
    this.posts = posts;
  }

  getPost = (postNumber: number): Post | undefined => this.posts?.find(post => post.number === postNumber);
}

export default PostStore;
