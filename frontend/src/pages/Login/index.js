import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LoginContainer,
  Logo,
  LoginWrapper,
  LoginInner,
  FindInner,
  FindText,
  Input,
  Button,
} from './styles';
import { KAKAO_API, ROUTE } from '../../constants';

function Login() {
  const navigate = useNavigate();
  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    // const { id, pw } = e.target;
    e.reset();
  };
  const handleOnClick = (api) => () => window.location.assign(api);
  const hanldeOnClickText = (path) => () => navigate(`/${path}`);

  return (
    <LoginContainer>
      <Logo />
      <LoginWrapper onSubmit={hanldeOnSumbmit}>
        <LoginInner>
          <Input name="id" type="email" placeholder="이메일 주소 입력" />
          <Input name="pw" type="password" placeholder="비밀번호 입력" />
        </LoginInner>

        <FindInner>
          <FindText onClick={hanldeOnClickText(ROUTE.IDINQUIRY.PATH)}>
            {ROUTE.IDINQUIRY.NAME}
          </FindText>
          <FindText onClick={hanldeOnClickText(ROUTE.PWINQUIRY.PATH)}>
            {ROUTE.PWINQUIRY.NAME}
          </FindText>
        </FindInner>

        <LoginInner>
          <Button type="submit">{ROUTE.LOGIN.NAME}</Button>
          <Button onClick={handleOnClick(KAKAO_API.URI())}>
            {KAKAO_API.NAME}
          </Button>
        </LoginInner>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default Login;
