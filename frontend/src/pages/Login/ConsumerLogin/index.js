import React from 'react';
import { Form } from '../../../components';
import { ButtonInner } from './styles';
import { KAKAO_API } from '../../../constants';

function ConsumerLogin() {
  const handleOnSubmit = (api) => (e) => {
    e.preventDefault();
    window.location.assign(api);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    alert('준비중입니다...!!');
  };

  return (
    <Form.Container onSubmit={handleOnSubmit(KAKAO_API.URI())}>
      <Form.Wrapper>
        <ButtonInner>
          <Form.Button type="submit">카카오 로그인</Form.Button>
          <Form.Button type="button" onClick={handleOnClick}>
            구글 로그인
          </Form.Button>
          <Form.Button type="button" onClick={handleOnClick}>
            페이스북 로그인
          </Form.Button>
          <Form.Button type="button" onClick={handleOnClick}>
            깃허브 로그인
          </Form.Button>
        </ButtonInner>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default ConsumerLogin;
