import React from 'react';
import { Form } from '../../components';
import { COLOR } from '../../constants';

function IdInquiry() {
  return (
    <Form.Container>
      <Form.Wrapper>
        <Form.Input placeholder="사용자 이름 입력" />
        <Form.Input placeholder="휴대폰 전화번호 입력 (-제외)" />
        <Form.Button color={COLOR.NAVY} fontColor={COLOR.WHITE}>
          아이디 찾기
        </Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default IdInquiry;
