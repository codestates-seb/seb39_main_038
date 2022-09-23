import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../../store';
import { Modal, ModalText } from '../Modal';
import { COLOR } from '../../../constants';
import {
  FoodModalBody,
  FoodModalImage,
  FoodModalBox,
  FoodModalTitle,
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
          <ModalText>{null}</ModalText>
        </FoodModalBox>
        <FoodModalBox>
          <ModalText>가격</ModalText>
          <ModalText>20,900원</ModalText>
        </FoodModalBox>
        <FoodModalBox>
          <ModalText>수량</ModalText>
          <ModalText>
            <FoodModalButtonBox>
              <FoodModalCountButton>＋</FoodModalCountButton>
              <FoodModalCountButton as="a" count>
                {0}
              </FoodModalCountButton>
              <FoodModalCountButton>－</FoodModalCountButton>
            </FoodModalButtonBox>
          </ModalText>
        </FoodModalBox>
        <FoodModalBox height={80}>
          <ModalText>총 주문금액</ModalText>
          <ModalText size={24} color={COLOR.YELLOW}>
            20,900원
          </ModalText>
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
