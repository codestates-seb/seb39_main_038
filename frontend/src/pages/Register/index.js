import React from 'react';
import { Form } from '../../components';
import { COLOR } from '../../constants';

function Register() {
  return (
    <Form.Container>
      <Form.Wrapper>
        <Form.Input placeholder="이메일 주소 입력" />
        <Form.Input placeholder="이름 입력" />
        <Form.Input placeholder="휴대폰 전화번호 입력 (-제외)" />
        <Form.Input placeholder="비밀번호 입력" />
        <Form.Input placeholder="비밀번호 확인" />
        <Form.Button color={COLOR.NAVY} fontColor={COLOR.WHITE}>
          회원가입
        </Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default Register;
