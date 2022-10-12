import React, { useEffect, useRef } from 'react';
import {
  ThumbnailContainer,
  ThumbnailWrapper,
  ThumbnailTitle,
  ThumbnailImage,
} from './styles';

function ThumbnailIndex({ title, src, query }) {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.setAttribute('data-query', query);
  }, [query]);

  return (
    <ThumbnailContainer ref={containerRef}>
      <ThumbnailWrapper>
        <ThumbnailTitle>{title}</ThumbnailTitle>
        <ThumbnailImage src={src} alt={title} />
      </ThumbnailWrapper>
    </ThumbnailContainer>
  );
}

const Thumbnail = React.memo(ThumbnailIndex);

export { Thumbnail };
