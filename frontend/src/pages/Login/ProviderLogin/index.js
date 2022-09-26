import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../components';
import { Logo, LoginInner, FindInner, FindText } from './styles';
import { ROUTE, COLOR } from '../../../constants';
// import { sha256 } from '../../../utils';

/*
  비밀번호 규칙
  1. 10자리 이상
  2. 숫자 영문 특수문자
*/

function ProviderLogin() {
  const navigate = useNavigate();

  const validation = (email, pw) => {
    if (!(email && pw)) return 401;
    if (pw.length < 10) return 402;
    return null;
  };

  const hanldeOnSumbmit = (e) => {
    e.preventDefault();
    const { id, pw } = e.target;
    const isCheck = validation(id.value, pw.value);
    if (isCheck === 401) return alert('이메일과 비밀번호 모두 입력해주세요.');
    if (isCheck === 402) return alert('비밀번호는 10자 이상입니다.');
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
