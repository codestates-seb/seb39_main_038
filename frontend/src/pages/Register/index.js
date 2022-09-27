import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { COLOR, ALERT, ROUTE, API_URI } from '../../constants';
import { sha256 } from '../../utils';

function Register() {
  const navigate = useNavigate();

  const postUserData = async (email, name, phone, password) => {
    const userInfo = {
      email,
      name,
      phone,
      password,
    };
    console.log('userInfo', userInfo);
    const response = await axios.post(API_URI.REGISTER, userInfo);
    console.log('response', response);
    return navigate(`/${ROUTE.LOGIN.PATH}`, { state: ROUTE.REGISTER.PATH });
  };

  const validation = (email, name, phone, password, passwordCheck) => {
    const koreaRegex = /^[가-힣]+$/;
    const pwRegex = /^.*(?=^.{10,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const phoneRegex = /^[0-9]+$/;
    if (!(email && name && phone && password && passwordCheck))
      return ALERT.CLIENT[401].STATUS;
    if (!koreaRegex.test(name)) return ALERT.CLIENT[403].STATUS;
    if (!pwRegex.test(password)) return ALERT.CLIENT[404].STATUS;
    if (password !== passwordCheck) return ALERT.CLIENT[405].STATUS;
    if (!phoneRegex.test(phone)) return ALERT.CLIENT[406].STATUS;
    return null;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, name, phone, password, passwordCheck } = e.target;
    const isCheck = validation(
      email.value,
      name.value,
      phone.value,
      password.value,
      passwordCheck.value,
    );
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    postUserData(
      email.value,
      name.value,
      phone.value,
      sha256(password.value),
    ).catch(() => alert('서버가 작동중이 아닙니다.'));
    return null;
  };

  return (
    <Form.Container onSubmit={handleOnSubmit}>
      <Form.Wrapper>
        <Form.Input name="email" type="email" placeholder="이메일 주소 입력" />
        <Form.Input name="name" type="text" placeholder="이름 입력" />
        <Form.Input
          name="phone"
          type="tel"
          placeholder="휴대폰 전화번호 입력 (-제외)"
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="비밀번호 입력"
        />
        <Form.Input
          type="password"
          name="passwordCheck"
          placeholder="비밀번호 확인"
        />
        <Form.Button type="submit" color={COLOR.NAVY} fontColor={COLOR.WHITE}>
          {ROUTE.REGISTER.NAME}
        </Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default Register;
