import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  const [count, setCount] = useState(1);
  const isMadal = useRecoilValue(atoms.modal);
  const setOrderList = useSetRecoilState(atoms.orderList);
  const { name, info, price } = useRecoilValue(atoms.menuOrder);
  if (!isMadal.food) return null;

  const plusCount = () => {
    setCount(count + 1);
  };

  const minusCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const goBusket = () => {
    closeModal();
    setOrderList((prev) => {
      const result = { name, price, count };
      return [...prev, result];
    });
  };

  const goOrder = () => {};

  return (
    <Modal title="메뉴상세" width={450} height={600} closeModal={closeModal}>
      <FoodModalBody>
        <FoodModalImage />
        <FoodModalBox description>
          <FoodModalTitle>{name}</FoodModalTitle>
          <ModalText>{info}</ModalText>
        </FoodModalBox>
        <FoodModalBox>
          <ModalText>가격</ModalText>
          <ModalText>{price}원</ModalText>
        </FoodModalBox>
        <FoodModalBox>
          <ModalText>수량</ModalText>
          <ModalText>
            <FoodModalButtonBox>
              <FoodModalCountButton onClick={plusCount}>
                ＋
              </FoodModalCountButton>
              <FoodModalCountButton as="a" count>
                {count}
              </FoodModalCountButton>
              <FoodModalCountButton onClick={minusCount}>
                －
              </FoodModalCountButton>
            </FoodModalButtonBox>
          </ModalText>
        </FoodModalBox>
        <FoodModalBox height={80}>
          <ModalText>총 주문금액</ModalText>
          <ModalText size={24} color={COLOR.YELLOW}>
            {count * price}원
          </ModalText>
        </FoodModalBox>
      </FoodModalBody>
      <FoodModalFooter>
        <FoodModalFooterButton
          width="50%"
          color={COLOR.NAVY}
          onClick={goBusket}
        >
          주문표에 추가
        </FoodModalFooterButton>
        <FoodModalFooterButton
          onClick={goOrder}
          width="50%"
          color={COLOR.YELLOW}
        >
          주문하기
        </FoodModalFooterButton>
      </FoodModalFooter>
    </Modal>
  );
}

export { FoodModal };
