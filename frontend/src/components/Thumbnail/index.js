import React from 'react';
import {
  ThumbnailContainer,
  ThumbnailWrapper,
  ThumbnailTitle,
  ThumbnailImage,
} from './styles';

function Thumbnail({ width, title, src }) {
  return (
    <ThumbnailContainer width={width}>
      <ThumbnailWrapper>
        <ThumbnailTitle>{title}</ThumbnailTitle>
        <ThumbnailImage src={src} alt={title} />
      </ThumbnailWrapper>
    </ThumbnailContainer>
  );
}

export default Thumbnail;
