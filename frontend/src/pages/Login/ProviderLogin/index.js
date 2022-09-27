import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components';
import { Logo, LoginInner, FindInner, FindText } from './styles';
import { ROUTE, COLOR, ALERT } from '../../../constants';
// import { sha256 } from '../../../utils';

function ProviderLogin() {
  const navigate = useNavigate();

  const validation = (email, pw) => {
    if (!(email && pw)) return ALERT.CLIENT[401].STATUS;
    if (pw.length < 10) return ALERT.CLIENT[402].STATUS;
    return null;
  };

  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    const { email, pw } = e.target;
    const isCheck = validation(email.value, pw.value);
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    return null;
  };

  const hanldeOnClickText = (path) => () => navigate(`/${path}`);

  return (
    <Form.Container>
      <Logo />
      <Form.Wrapper onSubmit={hanldeOnSumbmit}>
        <LoginInner>
          <Form.Input
            name="email"
            type="email"
            placeholder="이메일 주소 입력"
          />
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
          <Form.Button
            type="submit"
            color={COLOR.YELLOW}
            fontColor={COLOR.WHITE}
          >
            {ROUTE.LOGIN.NAME}
          </Form.Button>
          <Form.Button
            type="button"
            color={COLOR.NAVY}
            fontColor={COLOR.WHITE}
            onClick={hanldeOnClickText(ROUTE.REGISTER.PATH)}
          >
            {ROUTE.REGISTER.NAME}
          </Form.Button>
        </LoginInner>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default ProviderLogin;
