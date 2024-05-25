import { ReactElement, useState } from 'react';
import { Post } from 'src/models';
import { ShowThumbnailButton, ThumbnailContainer, ThumbnailImage, ThumbnailLink } from './styled';

interface Thumbnail {
  url: string;
  image: string;
}

interface ThumbnailSectionProps {
  post: Post;
}

export const ThumbnailSection = ({ post }: ThumbnailSectionProps): ReactElement => {
  const [showThumbnail, setShowThumbnail] = useState<boolean>(false);

  const filterThumbnailsFromPostBody = (): Thumbnail[] => {
    const matchedThumbnailSection = post.body_formatted.match(/<p class="thumbnails">.+<\/p>/g);
    if (!matchedThumbnailSection?.[0]) return [];

    const splittedMatchedThumbnails = matchedThumbnailSection?.[0]?.match(/(href|src)="[^"]+"/g);
    if (!splittedMatchedThumbnails?.length) return [];

    const thumbnails: Thumbnail[] = [];
    for (let i = 0; i < splittedMatchedThumbnails.length; i += 2) {
      const url = splittedMatchedThumbnails[i]
        .replace(/^href="/, '')
        .replace(/"$/, '')
        .replace(/^\/\//g, 'https://');
      const image = splittedMatchedThumbnails[i + 1]
        .replace(/^src="/, '')
        .replace(/"$/, '')
        .replace(/^\/\//g, 'https://');

      thumbnails.push({ url, image });
    }

    return thumbnails;
  };

  const thumbnails: Thumbnail[] = filterThumbnailsFromPostBody();

  const handleClickShowThumbnailButton = (): void => {
    setShowThumbnail(!showThumbnail);
  };

  return (
    <>
      {thumbnails.length ? (
        <ShowThumbnailButton onClick={handleClickShowThumbnailButton}>View Image</ShowThumbnailButton>
      ) : (
        <></>
      )}
      {showThumbnail ? (
        <ThumbnailContainer>
          {thumbnails.map(({ url, image }) => (
            <ThumbnailLink key={`${url}:${image}`} href={url} target="_blank">
              <ThumbnailImage src={image} />
            </ThumbnailLink>
          ))}
        </ThumbnailContainer>
      ) : (
        <></>
      )}
    </>
  );
};
