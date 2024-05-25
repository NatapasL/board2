import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, MouseEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { postReply } from 'src/api/replyApi';
import { storesContext } from 'src/contexts/storesContext';
import { PostReplyForm } from 'src/models';
import { BumpTopicButton, BumpTopicSign, Form, SubmitButton, Textarea } from './styled';

interface ReplyFormProps {
  replyPostNumber: number | undefined;
  onAddReplyPostNumberToInputComplete: () => void;
}

export const ReplyForm = observer(
  ({ replyPostNumber, onAddReplyPostNumberToInputComplete }: ReplyFormProps): ReactElement => {
    const { topicStore, postStore } = useContext(storesContext);
    const { currentTopic } = topicStore;
    const formRef = useRef<HTMLFormElement>();
    const textareaRef = useRef<HTMLInputElement>();

    const [form, setForm] = useState<PostReplyForm>({
      text: '',
      bumpTopic: true,
    });

    useEffect(() => {
      if (typeof replyPostNumber !== 'number') return;

      const caretPosition = textareaRef.current?.selectionStart || 0;
      const newFormText = form.text.slice(0, caretPosition) + ` >>${replyPostNumber} ` + form.text.slice(caretPosition);

      setForm({ ...form, text: newFormText });
      onAddReplyPostNumberToInputComplete();

      formRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [replyPostNumber]);

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
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <BumpTopicButton onClick={handleClickBumpTopicButton}>
          <div>Bump topic:</div>
          <BumpTopicSign>{form.bumpTopic ? '✓' : '✗'}</BumpTopicSign>
        </BumpTopicButton>

        <Textarea
          ref={textareaRef}
          placeholder="Reply to this topic."
          onChange={handleTextareaChange}
          value={form.text}
        ></Textarea>
        <SubmitButton disabled={!form.text.length}>Reply</SubmitButton>
      </Form>
    );
  }
);
