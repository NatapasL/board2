import axios from 'axios';

import { HANDLER_RECENT_POSTS, HANDLER_ALL_POSTS } from 'src/constants/api';

export const getRecentPosts = (topicId) => {
  const query = `handler=${HANDLER_RECENT_POSTS}&topic_id=${topicId}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};

export const getAllPosts = (topicId) => {
  const query = `handler=${HANDLER_ALL_POSTS}&topic_id=${topicId}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};
