import React from 'react';
import { LoginContainer, LoginWrapper, Input, Button } from './styles';
import { KAKAO_API, ROUTE } from '../../constants';

function Login() {
  const hanldeOnSumbmit = (e) => e.preventDefault();
  const handleOnClick = (api) => () => window.location.assign(api);

  return (
    <LoginContainer>
      <LoginWrapper onSubmit={hanldeOnSumbmit}>
        <Input placeholder="이메일 주소 입력" />
        <Input placeholder="비밀번호 입력" />
        <Button>{ROUTE.LOGIN.NAME}</Button>
        <Button onClick={handleOnClick(KAKAO_API.URI())}>
          {KAKAO_API.NAME}
        </Button>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
