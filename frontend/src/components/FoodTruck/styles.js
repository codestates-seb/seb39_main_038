import styled, { css } from 'styled-components';
import { SCREEN, COLOR } from '../../constants';

const FoodTruckContainer = styled.div`
  height: 108px;
  width: calc(50% - 5px);
  border: 1px solid #d9d9d9;
  cursor: pointer;
  @media all and (max-width: ${SCREEN.TABLET}) {
    width: 100%;
  }
`;

const FoodTruckWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 10px 8px;
`;

const FoodTruckImage = styled.img`
  width: 70px;
  height: 70px;
  background-color: red;
`;

const FoodTruckTextInner = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const FoodTruckTitle = styled.h1`
  font-size: 16px;
`;

const FoodTruckContentBox = styled.div`
  padding: 4px 0px 6px 0px;
`;

const FoodTruckText = styled.span`
  font-size: 12px;
  color: ${({ color }) => (color ? `${color}` : '#333333')};

  ${({ none }) =>
    !none &&
    css`
      &::after {
        content: 'ㅣ';
        color: #d9d9d9;
      }
    `}
`;

const FoodTruckTime = styled.p`
  align-self: flex-end;
  font-size: 11px;
  color: #999;
`;

const FoodTruckTagBox = styled.div`
  display: flex;
  gap: 0px 2px;
  overflow: hidden;
`;

const FoodTruckTag = styled.span`
  font-size: 10px;
  border: 1px solid ${COLOR.LIGHTNAVY};
  color: ${COLOR.LIGHTNAVY};
  padding: 1px 4px;
  flex-shrink: 0;
`;

export {
  FoodTruckContainer,
  FoodTruckWrapper,
  FoodTruckImage,
  FoodTruckTagBox,
  FoodTruckTag,
  FoodTruckTextInner,
  FoodTruckTitle,
  FoodTruckContentBox,
  FoodTruckText,
  FoodTruckTime,
};
