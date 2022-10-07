import styled from 'styled-components';
import { SCREEN, COLOR } from '../../constants';

const StickyBody = styled.div`
  width: 33.333%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media screen and (max-width: ${SCREEN.TABLET}) {
    width: 100%;
  }
`;

const CartListBody = styled.div`
  border: 1px solid lightgrey;
  max-height: 400px;
  overflow: auto;
`;

const Cart = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${SCREEN.TABLET}) {
    padding: 20px 0px;
  }
`;

const CartTab = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLOR.NAVY};
  color: ${COLOR.YELLOW};
  padding: 10px 15px;
`;

const CartTitle = styled.h1`
  color: ${COLOR.YELLOW};
  font-weight: 600;
  font-size: 16px;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-weight: 900;
  background-color: lightyellow;
  border: 1px solid lightgrey;
  margin-top: -1px;
  padding: 10px 12px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 1px 10px;
  border: 1px solid ${COLOR.WHITE};
  background-color: transparent;
  color: ${COLOR.WHITE};
  font-size: 10px;
`;

const OrderButton = styled.button`
  background-color: ${COLOR.NAVY};
  color: ${COLOR.YELLOW};
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  padding: 10px 15px;

  @media screen and (max-width: ${SCREEN.TABLET}) {
    position: fixed;
    bottom: 0;
  }
`;

const BlankOrderBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 200;
  color: #666666;
`;

export {
  StickyBody,
  CartListBody,
  Cart,
  CartTab,
  TotalPrice,
  OrderButton,
  CartTitle,
  Button,
  BlankOrderBox,
};
