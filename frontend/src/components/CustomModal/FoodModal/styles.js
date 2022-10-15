import styled, { css } from 'styled-components';

const FoodModalBody = styled.div`
  position: absolute;
  top: 60px;
  bottom: 48px;
  overflow-y: auto;
  width: 100%;
  background-color: #efefef;
`;

const FoodModalImage = styled.div`
  background-color: gold;
  height: 220px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: ${({ url }) =>
    url
      ? `url(${url})`
      : `url("https://www.yogiyo.co.kr/mobile/image/ic_photomenu_default.png")`};
`;

const FoodModalBox = styled.div`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
  height: ${({ height }) => height};

  ${({ description }) =>
    description &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px;

      span {
        font-size: 12px;
        color: #999;
        padding-top: 5px;
        padding-bottom: 3px;
      }
    `}
`;

const FoodModalTitle = styled.h1`
  font-size: 24px;
`;

const FoodModalButtonBox = styled.div`
  display: flex;
`;

const FoodModalCountButton = styled.button`
  border: 1px solid #ccc;
  background-color: transparent;
  padding: 4px 8px;
  ${({ count }) =>
    count &&
    css`
      padding: 4px 16px;
    `}
`;

const FoodModalFooter = styled.footer`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const FoodModalFooterButton = styled.button`
  width: ${({ width }) => width};
  height: 48px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  padding: 4px;
  background-color: ${({ color }) => (color ? `${color}` : 'transparent')};
  color: white;
`;

export {
  FoodModalBody,
  FoodModalBox,
  FoodModalButtonBox,
  FoodModalCountButton,
  FoodModalFooter,
  FoodModalFooterButton,
  FoodModalImage,
  FoodModalTitle,
};
