import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components';
import { Logo, LoginInner, FindInner, FindText } from './styles';
import { ROUTE, COLOR, ALERT } from '../../../constants';
// import { sha256 } from '../../../utils';

function ProviderLogin() {
  const navigate = useNavigate();

  const validation = (id, pw) => {
    if (!(id && pw)) return ALERT.E400.STATUS;
    if (pw.length < 10) return ALERT.E401.STATUS;
    return null;
  };

  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    const { id, pw } = e.target;
    const isCheck = validation(id.value, pw.value);
    if (isCheck === ALERT.E400.STATUS) return alert(ALERT.E400.MESSAGE);
    if (isCheck === ALERT.E401.STATUS) return alert(ALERT.E401.MESSAGE);
    return null;
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
