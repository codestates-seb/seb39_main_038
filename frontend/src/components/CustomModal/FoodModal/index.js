import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../../store';
import { Modal } from '../Modal';
import { COLOR } from '../../../constants';
import {
  FoodModalBody,
  FoodModalImage,
  FoodModalBox,
  FoodModalTitle,
  FoodModalText,
  FoodModalButtonBox,
  FoodModalCountButton,
  FoodModalFooter,
  FoodModalFooterButton,
} from './styles';

function FoodModal({ closeModal }) {
  const isMadal = useRecoilValue(atoms.modal);
  if (!isMadal.food) return null;
  return (
    <Modal title="메뉴상세" width={450} height={600} closeModal={closeModal}>
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
