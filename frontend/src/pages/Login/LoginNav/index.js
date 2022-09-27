import React from 'react';
import { LoginNavContainer, ButtonWrapper, Button } from './styles';

function LoginNav({ isChecked, setIsChecked }) {
  const handleOnClick = (bool) => () => setIsChecked(bool);
  return (
    <LoginNavContainer>
      <ButtonWrapper>
        <Button active={!!isChecked} onClick={handleOnClick(true)}>
          일반 회원
        </Button>
        <Button active={!isChecked} onClick={handleOnClick(false)}>
          사업자 회원
        </Button>
      </ButtonWrapper>
    </LoginNavContainer>
  );
}

export default LoginNav;
