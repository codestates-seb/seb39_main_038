import React from 'react';
import {
  ThumbnailContainer,
  ThumbnailWrapper,
  ThumbnailTitle,
  ThumbnailImage,
} from './styles';

function Thumbnail({ title, src }) {
  return (
    <ThumbnailContainer>
      <ThumbnailWrapper>
        <ThumbnailTitle>{title}</ThumbnailTitle>
        <ThumbnailImage src={src} alt={title} />
      </ThumbnailWrapper>
    </ThumbnailContainer>
  );
}

export default Thumbnail;
