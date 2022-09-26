import React from 'react';
import styled from 'styled-components';
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
  border: 1px solid ${COLOR.LIGHTNAVY};
  color: ${COLOR.LIGHTNAVY};
  background-color: transparent;
  border-radius: 1px;
  cursor: pointer;
`;

function LoginNav() {
  return (
    <LoginNavContainer>
      <ButtonWrapper>
        <Button>일반 회원</Button>
        <Button>사업자 회원</Button>
      </ButtonWrapper>
    </LoginNavContainer>
  );
}

export default LoginNav;
