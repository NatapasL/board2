import { colors } from 'src/styles/variables';
import styled from 'styled-components';

export const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  margin-top: 16px;
`;

export const ThumbnailLink = styled.a`
  display: flex;
  height: 90px;
  width: 90px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailImage = styled.img`
  object-fit: cover;
  max-height: 90px;
`;

export const ShowThumbnailButton = styled.button`
  border: none;
  background-color: ${colors.white};
  font-size: 12px;
  font-weight: 600;
  color: ${colors.black5};
  height: 24px;
  padding: 0;
`;
