import styled from 'styled-components';
import { COLOR } from '../../constants';

const CartListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  padding: 10px 15px;
`;

const FoodName = styled.h2`
  font-size: 14px;
  padding: 10px 0px;
`;

const CartListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartListInner = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 1px 2px;
  border: 1px solid ${({ color }) => color || `${COLOR.LIGHTNAVY}`};
  background-color: transparent;
  color: ${({ color }) => color || `${COLOR.LIGHTNAVY}`};
  font-size: 14px;
`;

const Text = styled.span`
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  padding-bottom: 2px;
`;

export {
  CartListContainer,
  FoodName,
  CartListWrapper,
  CartListInner,
  Button,
  Text,
};
