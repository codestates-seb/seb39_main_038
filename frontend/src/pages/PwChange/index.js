import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form } from '../../components';
import { COLOR, ROUTE, ALERT, API_URI, TEXT } from '../../constants';
import { sha256 } from '../../utils';

function PwChange() {
  const navigate = useNavigate();
  const location = useLocation();

  const patchUserData = async (email, password) => {
    const response = await axios.patch(API_URI.PWCHANGE, { email, password });
    if (response.status === 226) return alert(response.data?.message);
    return navigate(`/${ROUTE.LOGIN.PATH}`);
  };

  const validation = (password, passwordCheck) => {
    const pwRegex = /^.*(?=^.{10,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!(password && passwordCheck)) return ALERT.CLIENT[401].STATUS;
    if (!pwRegex.test(password)) return ALERT.CLIENT[404].STATUS;
    if (password !== passwordCheck) return ALERT.CLIENT[405].STATUS;
    return null;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { password, passwordCheck } = e.target;
    const isCheck = validation(password.value, passwordCheck.value);
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    patchUserData(location.state.email, sha256(password.value)).catch(() =>
      alert(ALERT.CLIENT[500].MESSAGE),
    );
    return null;
  };

  return (
    <Form.Container onSubmit={handleOnSubmit}>
      <Form.Wrapper>
        <Form.Input
          name="password"
          type="password"
          autoComplete="off"
          placeholder="새로 설정할 비밀번호를 입력"
        />
        <Form.Input
          name="passwordCheck"
          type="password"
          autoComplete="off"
          placeholder="비밀번호 확인"
        />
        <Form.Button type="submit" color={COLOR.NAVY} fontColor={COLOR.WHITE}>
          {TEXT.PWCHANGE.PASSWORD_FINDING_COMPLETE}
        </Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default PwChange;
