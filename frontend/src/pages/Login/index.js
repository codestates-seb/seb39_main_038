import React from 'react';
import { LoginContainer, LoginWrapper, Input, Button } from './styles';

function Login() {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Input placeholder="이메일 주소 입력" />
        <Input placeholder="비밀번호 입력" />
        <Button>로그인</Button>
        <Button>카카오 로그인</Button>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
