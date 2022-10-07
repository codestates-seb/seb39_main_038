import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atoms } from '../../../store';
import { Modal, ModalText } from '../Modal';
import { ROUTE, COLOR } from '../../../constants';
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
  const { name, info, price, menuId, storeId, storeName } = useRecoilValue(
    atoms.menuOrder,
  );

  const navigate = useNavigate();
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
    setCount(1);
    setOrderList((prev) => {
      const data = { name, price, count, menuId, storeId, storeName };
      if (prev.length === 0) return [...prev, data];

      const isCheck = prev.every((item) => item.storeId === storeId);
      if (!isCheck) {
        const bool = window.confirm(
          '이전 가게 내역이 남아있습니다. 장바구니를 비우시겠습니까?',
        );
        if (bool) return [data];
        return prev;
      }

      const index = prev.findIndex((item) => item.name === name);
      if (index === -1) return [...prev, data];

      const result = [];
      for (let i = 0; i < prev.length; i += 1) {
        const total = prev[i].count + count;
        if (index === i) result.push({ ...prev[i], count: total });
        else result.push(prev[i]);
      }
      return result;
    });
  };

  const goOrder = () => {
    goBusket();
    navigate(`/${ROUTE.ORDER.PATH}`, { state: storeId });
  };

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
