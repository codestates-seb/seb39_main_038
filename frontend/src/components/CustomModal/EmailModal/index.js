import React, { useRef } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atoms } from '../../../store';
import { Modal } from '../Modal';
import { ALERT, API_URI, ROUTE } from '../../../constants';
import { EmailBody, EmailButton, EmailInput } from './styles';

function EmailModal({ closeModal, email, setUserEmail }) {
  const isMadal = useRecoilValue(atoms.modal);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  if (!isMadal.email) return null;

  const handleOnClick = async () => {
    try {
      await axios.post(API_URI.PWVERIFY, {
        email,
        code: inputRef.current.value,
      });
      setUserEmail(null);
      navigate(`/${ROUTE.PWCHANGE.PATH}`, { replace: true, state: { email } });
    } catch {
      alert(ALERT.CLIENT[500].MESSAGE);
    }
  };

  return (
    <Modal title="이메일 확인" width={600} height={200} closeModal={closeModal}>
      <EmailBody>
        <EmailInput
          ref={inputRef}
          placeholder="전송된 이메일의 인증번호를 입력하세요."
        />
        <EmailButton onClick={handleOnClick}>인증번호 확인</EmailButton>
      </EmailBody>
    </Modal>
  );
}

export { EmailModal };
