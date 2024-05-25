import { colors } from 'src/styles/variables';
import styled from 'styled-components';

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  resize: none;
  border: 0;
  height: 114px;
  padding: 6px;
  border-radius: 2px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 4px;
  row-gap: 4px;
`;

export const SubmitButton = styled.button`
  height: 32px;
  color: ${colors.black3};
  background-color: ${colors.submitButton};
  border: none;
  border-radius: 4px;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
  }
`;

export const BumpTopicButton = styled.button`
  background-color: none;
  display: flex;
  justify-content: flex-end;
  column-gap: 4px;
  font-size: 12px;
  height: 32px;
  border: none;
`;

export const BumpTopicSign = styled.div`
  width: 12px;
`;
