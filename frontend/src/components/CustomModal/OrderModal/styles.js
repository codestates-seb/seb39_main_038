import styled, { css } from 'styled-components';

const OrderModalBody = styled.div`
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow-y: auto;
  width: 100%;
`;

const OrderMenuBox = styled.div`
  padding: 22px 15px;
  border-bottom: 1px solid #f0f0f0;
  div {
    padding: 2px 0px;
    border: none;
  }
  h2 {
    padding-bottom: 15px;
  }
`;

const OrderModalBox = styled.div`
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;
  ${({ none }) =>
    none &&
    css`
      border: none;
    `}
`;

const OrderModalTitle = styled.h1`
  font-size: 24px;
  padding: 25px 15px;
  border-bottom: 1px solid #ccc;
`;

export { OrderModalBody, OrderMenuBox, OrderModalBox, OrderModalTitle };
