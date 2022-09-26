import React from 'react';
import { Form } from '../../components';

function PwInquiry() {
  return (
    <Form.Container>
      <Form.Wrapper>
        <Form.Input placeholder="가입에 사용된 이메일 주소 입력" />
        <Form.Text>
          입력하신 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.
        </Form.Text>
        <Form.Text>카카오 소셜 회원은 비밀번호 찾기가 불가능합니다.</Form.Text>
        <Form.Button>이메일 발송</Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default PwInquiry;
