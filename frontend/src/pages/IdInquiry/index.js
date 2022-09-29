import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components';
import { COLOR, ROUTE, ALERT, API_URI } from '../../constants';

function IdInquiry() {
  const navigate = useNavigate();

  const validation = (name, phone) => {
    const koreaRegex = /^[가-힣]+$/;
    const phoneRegex = /(\d{3})-.*(\d{3})-.*(\d{4})/;
    if (!(name && phone)) return ALERT.CLIENT[401].STATUS;
    if (!koreaRegex.test(name)) return ALERT.CLIENT[403].STATUS;
    if (!phoneRegex.test(phone)) return ALERT.CLIENT[406].STATUS;
    return null;
  };

  const postUserData = async (name, phone) => {
    const userInfo = {
      name,
      phone,
    };
    const response = await axios.post(API_URI.IDINQUIRY, userInfo);
    if (response.status === 226) return alert(response.data?.message);
    alert(`이메일은 ${response.data?.data.email} 입니다.`);
    return navigate(`/${ROUTE.LOGIN.PATH}`);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = e.target;
    const isCheck = validation(name.value, phone.value);
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
    postUserData(name.value, phone.value).catch(() =>
      alert(ALERT.CLIENT[500].MESSAGE),
    );
    return null;
  };

  return (
    <Form.Container onSubmit={handleOnSubmit}>
      <Form.Wrapper>
        <Form.Input name="name" placeholder="사용자 이름 입력" />
        <Form.Input name="phone" placeholder="휴대폰 전화번호 입력 (-제외)" />
        <Form.Button type="submit" color={COLOR.NAVY} fontColor={COLOR.WHITE}>
          {ROUTE.IDINQUIRY.NAME}
        </Form.Button>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default IdInquiry;
