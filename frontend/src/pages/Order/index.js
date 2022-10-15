import React, { useState } from 'react';
import { Receipt } from '../../components';
import { TEXT } from '../../constants';
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
  const [request, setRequest] = useState('');
  const [radio, setRadio] = useState({ value: 'CARD', togle: true });

  const handleOnChangeRadio = (e) =>
    setRadio({ value: e.target.value, togle: !radio.togle });

  const hanldeOnChangeAreaText = (e) => setRequest(e.target.value);

  return (
    <OrderContainer>
      <OrderWrapper>
        <OrderTitle>{TEXT.ORDER.PAYMENT}</OrderTitle>
        <OrderBox>
          <OrderHeader>{TEXT.ORDER.REQUEST}</OrderHeader>
          <OrderContent>
            <TextEditor
              placeholder="주문시 요청사항을 입력해주세요."
              onChange={hanldeOnChangeAreaText}
            />
            <LimitBox>
              <Text>{TEXT.ORDER.MAX_LENGTH}</Text>
              <Text>{TEXT.ORDER.LENGHT_CHECK()}</Text>
            </LimitBox>
          </OrderContent>
        </OrderBox>
        <OrderBox>
          <OrderHeader>{TEXT.ORDER.METHOD_OF_PAYMENT}</OrderHeader>
          <OrderContent>
            <Text size={12} color="#999999">
              {TEXT.ORDER.CASH_PAYMENT_TOOLTIP}
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
                  {TEXT.ORDER.CARD_PAYMENT}
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
                  {TEXT.ORDER.CASH_PAYMENT}
                </Text>
              </Button>
            </ButtonBox>
          </OrderContent>
        </OrderBox>

        <OrderBox>
          <OrderHeader>{TEXT.ORDER.METHOD_OF_DISCOUNT}</OrderHeader>
          <OrderContent>
            <DiscountBox>
              <Input placeholder="사용할 마일리지를 입력해주세요." />
              <DiscountButton>
                <Text>{TEXT.ORDER.APPLY}</Text>
              </DiscountButton>
            </DiscountBox>
            <Text>{TEXT.ORDER.MILEAGE()}</Text>
          </OrderContent>
        </OrderBox>
      </OrderWrapper>
      <Receipt order request={request} type={radio.value} />
    </OrderContainer>
  );
}

export default Order;
