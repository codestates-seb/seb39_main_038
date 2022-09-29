import React from 'react';
import {
  MyPageContainer,
  InfoInner,
  Header,
  InfoContent,
  TextBox,
  Text,
  AvatarBox,
  Avatar,
  OrderInner,
  OrderContent,
  ButtonBox,
  Button,
} from './styles';

function MyPage() {
  return (
    <MyPageContainer>
      <InfoInner>
        <Header>유저정보</Header>
        <InfoContent>
          <TextBox>
            <Text size={14}>닉네임: 양희준</Text>
            <Text size={14}>이메일: codestate@gmail.com</Text>
            <Text size={14}>마일리지: 0 원</Text>
          </TextBox>
          <AvatarBox>
            <Avatar alt="avatar" />
            <Button>수정</Button>
          </AvatarBox>
        </InfoContent>
      </InfoInner>
      <OrderInner>
        <Header>주문조회</Header>
        <OrderContent>
          <TextBox>
            <Text size={14}>KFC</Text>
            <Text size={12} color="#999999">
              주문날짜: 2020.09.21
            </Text>
          </TextBox>
          <ButtonBox>
            <Button>리뷰쓰기</Button>
            <Button>주문상세</Button>
          </ButtonBox>
        </OrderContent>
      </OrderInner>
      <Button>가게 설정</Button>
    </MyPageContainer>
  );
}

export default MyPage;
