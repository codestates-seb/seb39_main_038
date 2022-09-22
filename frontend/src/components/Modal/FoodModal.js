import React from 'react';
import styled, { css } from 'styled-components';
import { Modal } from './Modal';
import { COLOR } from '../../constants';

const FoodModalBody = styled.div`
  height: 540px;
  overflow-y: auto;
`;

const FoodModalImage = styled.div`
  height: 220px;
  width: 100%;
  background-color: red;
`;

const FoodModalBox = styled.div`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 15px;
  height: ${({ height }) => height};

  ${({ description }) =>
    description &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px;

      p {
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

const FoodModalText = styled.p`
  font-size: ${({ size }) => (size ? `${size}` : '15px')};
  font-weight: bold;
  color: ${({ color }) => color};
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
  width: 100%;
  bottom: 48px;
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

function FoodModal() {
  return (
    <Modal title="메뉴상세">
      <FoodModalBody>
        <FoodModalImage />
        <FoodModalBox description>
          <FoodModalTitle>짬뽕</FoodModalTitle>
          <FoodModalText>{null}</FoodModalText>
        </FoodModalBox>
        <FoodModalBox>
          <FoodModalText>가격</FoodModalText>
          <FoodModalText>20,900원</FoodModalText>
        </FoodModalBox>
        <FoodModalBox>
          <FoodModalText>수량</FoodModalText>
          <FoodModalText>
            <FoodModalButtonBox>
              <FoodModalCountButton>＋</FoodModalCountButton>
              <FoodModalCountButton as="a" count>
                {0}
              </FoodModalCountButton>
              <FoodModalCountButton>－</FoodModalCountButton>
            </FoodModalButtonBox>
          </FoodModalText>
        </FoodModalBox>
        <FoodModalBox height={80}>
          <FoodModalText>총 주문금액</FoodModalText>
          <FoodModalText size={24} color={COLOR.YELLOW}>
            20,900원
          </FoodModalText>
        </FoodModalBox>
      </FoodModalBody>
      <FoodModalFooter>
        <FoodModalFooterButton width="50%" color={COLOR.NAVY}>
          주문표에 추가
        </FoodModalFooterButton>
        <FoodModalFooterButton width="50%" color={COLOR.YELLOW}>
          주문하기
        </FoodModalFooterButton>
      </FoodModalFooter>
    </Modal>
  );
}

export { FoodModal };
