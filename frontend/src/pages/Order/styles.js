import styled, { css } from 'styled-components';
import { COLOR, SCREEN } from '../../constants';

const { ORDER_URI } = process.env;

const OrderContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 20px 10px;
  display: flex;
  gap: 20px;
  @media screen and (max-width: ${SCREEN.TABLET}) {
    flex-direction: column;
  }
`;

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 66.6666%;
  @media screen and (max-width: ${SCREEN.TABLET}) {
    width: 100%;
  }
`;

const OrderTitle = styled.h1`
  font-size: 15.4px;
  padding: 10px 10px 10px 15px;
  color: white;
  background-color: #333333;
`;

const OrderBox = styled.div``;

const OrderHeader = styled.h2`
  background-color: #e6e6e6;
  font-size: 15px;
  padding: 10px 15px;
  border: 1px solid #ccc;
`;

const OrderContent = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
`;

const TextEditor = styled.textarea`
  width: 100%;
  font-size: 16px;
  padding: 15px 12px;
  resize: none;
  border: 1px solid #ccc;
`;

const LimitBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0px;
`;

const Text = styled.span`
  font-size: ${({ size }) => (size ? `${size}` : '14px')};
  color: ${({ color }) => (color ? `${color}` : '#333333')};
`;

const ButtonBox = styled.div`
  display: flex;
  padding: 10px 0px;
  gap: 8px;
`;

const Icon = styled.i`
  background: url(${ORDER_URI}) no-repeat;
  background-size: 132px;
  display: inline-block;
  vertical-align: middle;
  margin-top: -1px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-position: ${({ position }) => position};
`;

const Button = styled.button`
  width: 50%;
  font-size: 14px;
  color: #666666;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 1px solid #ccc;
  padding: 10px 15px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      border-color: ${COLOR.LIGHTNAVY};
      span {
        color: ${COLOR.LIGHTNAVY};
      }
    `}
`;

const RadioBox = styled.input`
  display: none;
`;

const DiscountBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-bottom: 6px;
`;

const Input = styled.input`
  padding: 6px 12px;
  flex: 1 1 auto;
`;

const DiscountButton = styled.button`
  padding: 6px 12px;
  flex-shrink: 0;
`;

export {
  OrderContainer,
  OrderWrapper,
  OrderContent,
  OrderTitle,
  OrderBox,
  OrderHeader,
  TextEditor,
  LimitBox,
  Text,
  DiscountBox,
  DiscountButton,
  Button,
  ButtonBox,
  Input,
  Icon,
  RadioBox,
};
