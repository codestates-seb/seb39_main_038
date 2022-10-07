import styled from 'styled-components';
import { COLOR } from '../../../constants';

const Logo = styled.div`
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  letter-spacing: 2px;
  font-family: 'Anton', sans-serif;
  color: ${COLOR.NAVY};
`;

const ButtonInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const Text = styled.span`
  font-weight: 500;
`;

export { ButtonInner, TextBox, Text, Logo };
