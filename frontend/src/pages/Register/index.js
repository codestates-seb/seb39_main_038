import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { COLOR, ALERT, ROUTE } from '../../constants';

function Register() {
  const navigate = useNavigate();

  const validation = (id, name, phone, pw, pwCheck) => {
    const koreaRegex = /^[가-힣]+$/;
    const pwRegex = /^.*(?=^.{10,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    const phoneRegex = /^[0-9]+$/;
    if (!(id && name && phone && pw && pwCheck))
      return ALERT.CLIENT.E401.STATUS;
    if (!koreaRegex.test(name)) return ALERT.CLIENT[403].STATUS;
    if (!pwRegex.test(pw)) return ALERT.CLIENT[404].STATUS;
    if (pw !== pwCheck) return ALERT.CLIENT[405].STATUS;
    if (!phoneRegex.test(phone)) return ALERT.CLIENT[406].STATUS;
    return null;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { id, name, phone, pw, pwCheck } = e.target;
    const isCheck = validation(
      id.value,
      name.value,
      phone.value,
      pw.value,
      pwCheck.value,
    );
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    return navigate(`/${ROUTE.LOGIN.PATH}`, { state: ROUTE.REGISTER.PATH });
  };

  return (
    <Form.Container onSubmit={handleOnSubmit}>
      <Form.Wrapper>
        <Form.Input name="id" type="email" placeholder="이메일 주소 입력" />
        <Form.Input name="name" type="text" placeholder="이름 입력" />
        <Form.Input
          name="phone"
          type="tel"
          placeholder="휴대폰 전화번호 입력 (-제외)"
        />
        <Form.Input type="password" name="pw" placeholder="비밀번호 입력" />
        <Form.Input
          type="password"
          name="pwCheck"
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
