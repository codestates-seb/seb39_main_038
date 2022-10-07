import React from 'react';
import { Form, SvgIcon } from '../../../components';
import { ButtonInner, TextBox, Text, Logo } from './styles';
import { KAKAO_API, TEXT, ALERT } from '../../../constants';

function ConsumerLogin() {
  const handleOnSubmit = (api) => (e) => {
    e.preventDefault();
    window.location.assign(api);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    alert(ALERT.CLIENT[400].MESSAGE);
  };

  return (
    <Form.Container onSubmit={handleOnSubmit(KAKAO_API.URI())}>
      <Logo>YAPICK</Logo>
      <Form.Wrapper>
        <ButtonInner>
          <Form.Button type="submit" color="#ffeb00">
            <TextBox>
              <SvgIcon name="kakao" />
              <Text>{TEXT.CONSUMERLOGIN.KAKAO_LOGIN}</Text>
            </TextBox>
          </Form.Button>
          <Form.Button
            type="button"
            color="#2f3337"
            fontColor="#fdfdfd"
            onClick={handleOnClick}
          >
            <TextBox>
              <SvgIcon name="gitHub" />
              <Text>{TEXT.CONSUMERLOGIN.GITHUB_LOGIN}</Text>
            </TextBox>
          </Form.Button>
          <Form.Button type="button" onClick={handleOnClick}>
            <TextBox>
              <SvgIcon name="google" />
              <Text>{TEXT.CONSUMERLOGIN.GOOGLE_LOGIN}</Text>
            </TextBox>
          </Form.Button>
          <Form.Button
            type="button"
            color="#385499"
            fontColor="#fdfdfd"
            onClick={handleOnClick}
          >
            <TextBox>
              <SvgIcon name="faceBook" />
              <Text>{TEXT.CONSUMERLOGIN.FACEBOOK_LOGIN}</Text>
            </TextBox>
          </Form.Button>
        </ButtonInner>
      </Form.Wrapper>
    </Form.Container>
  );
}

export default ConsumerLogin;
