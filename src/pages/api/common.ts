import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  HANDLER_ALL_POSTS,
  HANDLER_ALL_TOPICS,
  HANDLER_GET_TOPIC,
  HANDLER_POST_REPLY,
  HANDLER_RECENT_POSTS,
  HANDLER_RECENT_TOPICS,
} from 'src/constants/api';

export default function handler(request: NextApiRequest, response: NextApiResponse): void {
  const handler = request.query.handler;
  if (!handler) {
    response.status(400).json({ message: `no handler query` });
    return;
  }

  switch (handler) {
    case HANDLER_RECENT_TOPICS:
      axios.get(`${process.env.FANBOI_URL}/boards/${request.query.board_slug}?topics=1`).then(res => {
        response.send(res.data);
      });
      return;
    case HANDLER_ALL_TOPICS:
      axios.get(`${process.env.FANBOI_URL}/boards/${request.query.board_slug}/topics`).then(res => {
        response.send(res.data);
      });
      return;
    case HANDLER_GET_TOPIC:
      axios.get(`${process.env.FANBOI_URL}/topics/${request.query.topic_id}`).then(res => {
        response.send(res.data);
      });
      return;
    case HANDLER_RECENT_POSTS:
      axios.get(`${process.env.FANBOI_URL}/topics/${request.query.topic_id}?posts=1`).then(res => {
        response.send(res.data);
      });
      return;
    case HANDLER_ALL_POSTS:
      axios.get(`${process.env.FANBOI_URL}/topics/${request.query.topic_id}/posts`).then(res => {
        response.send(res.data);
      });
      return;
    case HANDLER_POST_REPLY:
      axios.post(`${process.env.FANBOI_URL}/topics/${request.query.topic_id}/posts/`, request.body).then(res => {
        console.log(res.data);
        console.log(res.status);
        console.log('===========================');
        response.send(res.data);
      });
      return;
    default:
      response.status(400).json({ message: `handler not match` });
  }
}
