import styled, { css } from 'styled-components';
import { COLOR } from '../../../constants';

const LoginNavContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
  gap: 5px;
`;

const Button = styled.button`
  font-size: 14px;
  border: none;
  font-weight: bold;
  border: 1px solid #ccc;
  color: #ccc;
  background-color: transparent;
  border-radius: 1px;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      border: 1px solid ${COLOR.LIGHTNAVY};
      color: ${COLOR.LIGHTNAVY};
    `}
`;

export { LoginNavContainer, ButtonWrapper, Button };
