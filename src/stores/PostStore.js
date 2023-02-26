import { observable, action } from 'mobx';
import axios from 'axios';

class PostStore {
  @observable posts = undefined;

  @action
  setPosts(posts) {
    this.posts = posts;
  }

  getPost = (number) => {
    return this.posts.find((post) => post.number === number);
  };
}

export default PostStore;
