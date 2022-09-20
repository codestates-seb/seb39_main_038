import React from 'react';
import {
  FormContainer,
  FormWrapper,
  FormInput,
  FormButton,
} from '../../components/Form';

function IdInquiry() {
  return (
    <FormContainer>
      <FormWrapper>
        <FormInput placeholder="사용자 이름 입력" />
        <FormInput placeholder="휴대폰 전화번호 입력 (-제외)" />
        <FormButton>아이디 찾기</FormButton>
      </FormWrapper>
    </FormContainer>
  );
}

export default IdInquiry;
