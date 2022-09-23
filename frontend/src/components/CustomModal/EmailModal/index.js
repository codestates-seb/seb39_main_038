import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../../store';
import { Modal } from '../Modal';
import { EmailBody, EmailButton, EmailInput } from './styles';

function EmailModal({ closeModal }) {
  const isMadal = useRecoilValue(atoms.modal);
  if (!isMadal.email) return null;
  return (
    <Modal title="이메일 확인" width={600} height={200} closeModal={closeModal}>
      <EmailBody>
        <EmailInput placeholder="전송된 이메일의 인증번호를 입력하세요." />
        <EmailButton>인증번호 확인</EmailButton>
      </EmailBody>
    </Modal>
  );
}

export { EmailModal };
