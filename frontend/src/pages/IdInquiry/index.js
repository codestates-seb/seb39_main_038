import React from 'react';
import { Form } from '../../components';
import { COLOR, ROUTE, ALERT } from '../../constants';

function IdInquiry() {
  const validation = (name, phone) => {
    const koreaRegex = /^[가-힣]+$/;
    const phoneRegex = /^[0-9]+$/;
    if (!(name && phone)) return ALERT.CLIENT[401].STATUS;
    if (!koreaRegex.test(name)) return ALERT.CLIENT[403].STATUS;
    if (!phoneRegex.test(phone)) return ALERT.CLIENT[406].STATUS;
    return null;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = e.target;
    const isCheck = validation(name.value, phone.value);
    if (ALERT.CLIENT[isCheck]) return alert(ALERT.CLIENT[isCheck].MESSAGE);
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
