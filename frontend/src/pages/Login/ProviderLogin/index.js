import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components';
import { Logo, LoginInner, FindInner, FindText } from './styles';
import { ROUTE } from '../../../constants';

function ProviderLogin() {
  const navigate = useNavigate();
  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    e.reset();
  };

  const hanldeOnClickText = (path) => () => navigate(`/${path}`);

  return (
    <Form.Container>
      <Logo />
      <Form.Wrapper onSubmit={hanldeOnSumbmit}>
        <LoginInner>
          <Form.Input name="id" type="email" placeholder="이메일 주소 입력" />
          <Form.Input name="pw" type="password" placeholder="비밀번호 입력" />
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
          <Form.Button type="submit">{ROUTE.LOGIN.NAME}</Form.Button>
          <Form.Button onClick={hanldeOnClickText(ROUTE.REGISTER.PATH)}>
            {ROUTE.REGISTER.NAME}
          </Form.Button>
        </LoginInner>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default ProviderLogin;
