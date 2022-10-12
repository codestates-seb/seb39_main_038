import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../../store';
import { Form } from '../../../components';
import { Logo, LoginInner, FindInner, FindText } from './styles';
import { ROUTE, COLOR, ALERT, API_URI } from '../../../constants';
import { sha256 } from '../../../utils';

function ProviderLogin() {
  const setIsLogin = useSetRecoilState(atoms.isLogin);
  const setLoginInfo = useSetRecoilState(atoms.loginInfo);
  const navigate = useNavigate();

  const postUserData = async (email, password) => {
    const userInfo = {
      email,
      password,
    };
    const response = await axios.post(API_URI.LOGIN, userInfo);
    if (response.status === 226) return alert(response.data?.message);
    setIsLogin({ state: true, type: 'local' });
    setLoginInfo({
      storeId: response.data.store?.storeId || null,
      localId: response.data.localId,
    });
    return navigate(ROUTE.HOME.PATH);
  };

  const validation = (email, pw) => {
    if (!(email && pw)) return ALERT.CLIENT[401].STATUS;
    if (pw.length < 10) return ALERT.CLIENT[402].STATUS;
    return null;
  };

  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const isCheck = validation(email.value, password.value);
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    postUserData(email.value, sha256(password.value));
    return null;
  };

  const hanldeOnClickText = (path) => () => navigate(`/${path}`);

  return (
    <Form.Container>
      <Logo>YAPICK</Logo>
      <Form.Wrapper onSubmit={hanldeOnSumbmit}>
        <LoginInner>
          <Form.Input
            name="email"
            type="email"
            autoComplete="off"
            placeholder="이메일 주소 입력"
          />
          <Form.Input
            name="password"
            type="password"
            autoComplete="off"
            placeholder="비밀번호 입력"
          />
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
