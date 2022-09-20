import React from 'react';
import {
  FormContainer,
  FormWrapper,
  FormInput,
  FormButton,
  FormText,
} from '../../components/Form';

function PwInquiry() {
  return (
    <FormContainer>
      <FormWrapper>
        <FormInput placeholder="가입에 사용된 이메일 주소 입력" />
        <FormText>
          입력하신 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.
        </FormText>
        <FormText>카카오 소셜 회원은 비밀번호 찾기가 불가능합니다.</FormText>
        <FormButton>이메일 발송</FormButton>
      </FormWrapper>
    </FormContainer>
  );
}

export default PwInquiry;
