import React from 'react';
import { LoginNavContainer, ButtonWrapper, Button } from './styles';
import { TEXT } from '../../../constants';

function LoginNav({ isChecked, setIsChecked }) {
  const handleOnClick = (bool) => () => setIsChecked(bool);
  return (
    <LoginNavContainer>
      <ButtonWrapper>
        <Button active={!!isChecked} onClick={handleOnClick(true)}>
          {TEXT.LOGINNAV.CONSUMER_LOGIN}
        </Button>
        <Button active={!isChecked} onClick={handleOnClick(false)}>
          {TEXT.LOGINNAV.PROVIDER_LOGIN}
        </Button>
      </ButtonWrapper>
    </LoginNavContainer>
  );
}

export default LoginNav;
