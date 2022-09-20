import styled from 'styled-components';
import { SCREEN } from '../../constants';

const ThumbnailContainer = styled.div`
  width: calc(33.333% - 5px);
  border: 1px solid #d9d9d9;
  cursor: pointer;
  @media all and (max-width: ${SCREEN.TABLET}) {
    width: calc(50% - 5px);
  }
`;

const ThumbnailWrapper = styled.a`
  display: flex;
  justify-content: space-between;
  @media all and (max-width: ${SCREEN.MOBILE}) {
    flex-direction: column;
  }
`;

const ThumbnailTitle = styled.div`
  font-size: 15.4px;
  flex-shrink: 0;
  padding: 10px;
`;

const ThumbnailImage = styled.img`
  width: 218px;
  height: 218px;
  overflow: hidden;
`;

export { ThumbnailContainer, ThumbnailWrapper, ThumbnailTitle, ThumbnailImage };
