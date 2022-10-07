import React, { useState } from 'react';
import {
  OrderContainer,
  OrderWrapper,
  OrderTitle,
  OrderBox,
  OrderHeader,
  OrderContent,
  TextEditor,
  LimitBox,
  Icon,
  Input,
  Text,
  ButtonBox,
  Button,
  DiscountBox,
  DiscountButton,
  RadioBox,
} from './styles';
import { Receipt } from '../../components';

function Order() {
  const [request, setRequest] = useState('');
  const [radio, setRadio] = useState({ value: 'CARD', togle: true });

  const handleOnChangeRadio = (e) =>
    setRadio({ value: e.target.value, togle: !radio.togle });

  const hanldeOnChangeAreaText = (e) => setRequest(e.target.value);

  return (
    <OrderContainer>
      <OrderWrapper>
        <OrderTitle>결제하기</OrderTitle>
        <OrderBox>
          <OrderHeader>주문시 요청사항</OrderHeader>
          <OrderContent>
            <TextEditor
              placeholder="주문시 요청사항을 입력해주세요."
              onChange={hanldeOnChangeAreaText}
            />
            <LimitBox>
              <Text>최대 100자까지 입력 가능합니다.</Text>
              <Text>100 / 100</Text>
            </LimitBox>
          </OrderContent>
        </OrderBox>
        <OrderBox>
          <OrderHeader>결제수단 선택</OrderHeader>
          <OrderContent>
            <Text size={12} color="#999999">
              현금결제를 원하시는 경우 직접 푸드트럭 앞에서 현금을 지불할 수
              있어요!
            </Text>
            <ButtonBox>
              <Button as="label" active={radio.togle}>
                <RadioBox
                  name="selector"
                  type="radio"
                  value="CARD"
                  onChange={handleOnChangeRadio}
                />
                <Icon width={22} height={24} position="-36px -46px" />
                <Text size={12} color="#999999">
                  신용카드
                </Text>
              </Button>

              <Button as="label" active={!radio.togle}>
                <RadioBox
                  name="selector"
                  type="radio"
                  value="CASH"
                  onChange={handleOnChangeRadio}
                />
                <Icon width={24} height={24} position="-39px -7px" />
                <Text size={12} color="#999999">
                  현금
                </Text>
              </Button>
            </ButtonBox>
          </OrderContent>
        </OrderBox>

        <OrderBox>
          <OrderHeader>할인방법 선택</OrderHeader>
          <OrderContent>
            <DiscountBox>
              <Input placeholder="사용할 마일리지를 입력해주세요." />
              <DiscountButton>
                <Text>적용</Text>
              </DiscountButton>
            </DiscountBox>
            <Text>마일리지: 0 원</Text>
          </OrderContent>
        </OrderBox>
      </OrderWrapper>
      <Receipt order request={request} type={radio.value} />
    </OrderContainer>
  );
}

export default Order;
