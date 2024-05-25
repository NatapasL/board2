import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, MouseEvent, ReactElement, useContext, useState } from 'react';
import { postReply } from 'src/api/replyApi';
import { storesContext } from 'src/contexts/storesContext';
import { PostReplyForm } from 'src/models';
import { BumpTopicButton, BumpTopicSign, Form, SubmitButton, Textarea } from './styled';

export const ReplyForm = observer((): ReactElement => {
  const { topicStore, postStore } = useContext(storesContext);
  const { currentTopic } = topicStore;

  const [form, setForm] = useState<PostReplyForm>({
    text: '',
    bumpTopic: true,
  });

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setForm({ ...form, text: event.target.value });
  };

  const handleClickBumpTopicButton = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
    event.preventDefault();
    setForm({ ...form, bumpTopic: !form.bumpTopic });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (typeof currentTopic?.id !== 'number') return;

    postReply(`${currentTopic.id}`, form).then(() => {
      setForm({ ...form, text: '' });
      postStore.refreshPost();
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Textarea placeholder="Reply to this topic." onChange={handleTextareaChange}></Textarea>
      <BumpTopicButton onClick={handleClickBumpTopicButton}>
        <div>Bump topic:</div>
        <BumpTopicSign>{form.bumpTopic ? '✓' : '✗'}</BumpTopicSign>
      </BumpTopicButton>
      <SubmitButton disabled={!form.text.length}>Reply</SubmitButton>
    </Form>
  );
});
