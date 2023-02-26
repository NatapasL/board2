import axios from 'axios';

import {
  HANDLER_GET_TOPIC,
  HANDLER_RECENT_TOPICS,
  HANDLER_ALL_TOPICS,
} from './../constants/api';

export const getTopic = (topicId) => {
  const query = `handler=${HANDLER_GET_TOPIC}&topic_id=${topicId}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};

export const getRecentTopics = (boardSlug) => {
  const query = `handler=${HANDLER_RECENT_TOPICS}&board_slug=${boardSlug}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};

export const getAllTopics = (boardSlug) => {
  const query = `handler=${HANDLER_ALL_TOPICS}&board_slug=${boardSlug}`;

  return axios.get(`${process.env.BACKEND_BASE_URL}?${query}`);
};
