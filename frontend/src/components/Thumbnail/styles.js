import styled from 'styled-components';

const ThumbnailContainer = styled.div`
  width: ${({ width }) => width};
  border: 1px solid #d9d9d9;
`;

const ThumbnailWrapper = styled.a`
  display: flex;
  justify-content: space-between;
`;

const ThumbnailTitle = styled.div`
  font-size: 15.4px;
  flex-shrink: 0;
  padding: 10px;
`;

const ThumbnailImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export { ThumbnailContainer, ThumbnailWrapper, ThumbnailTitle, ThumbnailImage };
