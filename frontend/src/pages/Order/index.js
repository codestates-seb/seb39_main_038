import React, { useEffect, useState } from 'react';
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

function Order() {
  const [radio, setRadio] = useState({ value: 'card', togle: true });

  const handleOnChange = (e) => {
    setRadio({ value: e.target.value, togle: !radio.togle });
  };

  useEffect(() => {
    console.log(radio);
  }, [radio]);

  return (
    <OrderContainer>
      <OrderWrapper>
        <OrderTitle>결제하기</OrderTitle>
        <OrderBox>
          <OrderHeader>주문시 요청사항</OrderHeader>
          <OrderContent>
            <TextEditor placeholder="주문시 요청사항을 입력해주세요." />
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
                  value="card"
                  onChange={handleOnChange}
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
                  value="cash"
                  onChange={handleOnChange}
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
    </OrderContainer>
  );
}

export default Order;
