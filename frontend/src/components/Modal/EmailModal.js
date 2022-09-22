import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants';
import { Modal } from './Modal';

const EmailBody = styled.div`
  display: flex;
  height: calc(100% - 60px);
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  font-size: 15px;
`;

const EmailInput = styled.input`
  padding: 10px 15px;
`;

const EmailButton = styled.button`
  padding: 10px 15px;
  border: 0;
  color: #fdfdfd;
  background-color: ${COLOR.NAVY};
`;

function EmailModal() {
  return (
    <Modal title="이메일 확인" width={600} height={200}>
      <EmailBody>
        <EmailInput placeholder="전송된 이메일의 인증번호를 입력하세요." />
        <EmailButton>인증번호 확인</EmailButton>
      </EmailBody>
    </Modal>
  );
}

export { EmailModal };
