import axios from 'axios';
import React, { useState } from 'react';
import { useModal } from '../../hooks';
import { Form, CustomModal } from '../../components';
import { COLOR, API_URI, ALERT, TEXT } from '../../constants';
import { TextBox } from './styles';

function PwInquiry() {
  const [UserEmail, setUserEmail] = useState('');
  const [openEmail, closeEmail] = useModal('email');

  const postUserDate = async (email) => {
    const response = await axios.post(API_URI.PWINQUIRY, { email });
    if (response.status === 226) return alert(response.data?.message);
    openEmail();
    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email } = e.target;
    setUserEmail(email.value);
    postUserDate(email.value).catch(() => alert(ALERT.CLIENT[500].MESSAGE));
  };

  return (
    <Form.Container>
      <Form.Wrapper onSubmit={onSubmit}>
        <Form.Input name="email" placeholder="가입에 사용된 이메일 주소 입력" />
        <TextBox>
          <Form.Text>{TEXT.PWINQUIRY.POST_EMAIL}</Form.Text>
          <Form.Text>{TEXT.PWINQUIRY.IMPOSSIBLE}</Form.Text>
        </TextBox>
        <Form.Button
          type="submit"
          color={UserEmail ? COLOR.YELLOW : COLOR.NAVY}
          fontColor={COLOR.WHITE}
        >
          {UserEmail ? '이메일 재발송' : '이메일 발송'}
        </Form.Button>
        {UserEmail ? (
          <Form.Button
            type="button"
            onClick={openEmail}
            color={COLOR.NAVY}
            fontColor={COLOR.WHITE}
          >
            {TEXT.PWINQUIRY.OPEN_MODAL}
          </Form.Button>
        ) : null}
      </Form.Wrapper>
      <CustomModal.Email
        closeModal={closeEmail}
        email={UserEmail}
        setUserEmail={setUserEmail}
      />
    </Form.Container>
  );
}

export default PwInquiry;
