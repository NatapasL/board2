import axios, { AxiosResponse } from 'axios';
import { HANDLER_POST_REPLY } from 'src/constants/api';
import { PostReplyForm } from 'src/models';

export const postReply = (topicId: string, data: PostReplyForm): Promise<AxiosResponse<any>> => {
  const query = `handler=${HANDLER_POST_REPLY}&topic_id=${topicId}`;

  // return axios.post(`${process.env.BACKEND_BASE_URL}?${query}`, { body: data.text, bumped: data.bumpTopic });

  return axios.post(`https://fanboi.ch/api/1.0/topics/${topicId}/posts/`, { body: data.text, bumped: data.bumpTopic });
};
