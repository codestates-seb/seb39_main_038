import React from 'react';
import {
  FormContainer,
  FormWrapper,
  FormInput,
  FormButton,
} from '../../components/Form';

function Register() {
  return (
    <FormContainer>
      <FormWrapper>
        <FormInput placeholder="이메일 주소 입력" />
        <FormInput placeholder="이름 입력" />
        <FormInput placeholder="휴대폰 전화번호 입력 (-제외)" />
        <FormInput placeholder="비밀번호 입력" />
        <FormInput placeholder="비밀번호 확인" />
        <FormButton>회원가입</FormButton>
      </FormWrapper>
    </FormContainer>
  );
}

export default Register;
