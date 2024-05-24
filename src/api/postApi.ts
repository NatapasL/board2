import axios from 'axios';

import { HANDLER_ALL_POSTS, HANDLER_RECENT_POSTS } from 'src/constants/api';

export const getRecentPosts = (topicId: string) => {
  const query = `handler=${HANDLER_RECENT_POSTS}&topic_id=${topicId}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};

export const getAllPosts = (topicId: string) => {
  const query = `handler=${HANDLER_ALL_POSTS}&topic_id=${topicId}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};
