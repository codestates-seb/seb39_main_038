import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../store';
import { useMyPage } from '../../hooks';
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
  const { type } = useRecoilValue(atoms.isLogin);
  const { data } = useMyPage();
  const { avatar, email, name, phone } = data.data.data;

  return (
    <MyPageContainer>
      <InfoInner>
        <Header>유저정보</Header>
        <InfoContent>
          <TextBox>
            <Text size={14}>{`닉네임: ${name}`}</Text>
            <Text size={14}>{`이메일: ${email}`}</Text>
            {phone ? <Text size={14}>{`핸드폰 번호: ${phone}`}</Text> : null}
          </TextBox>
          <AvatarBox>
            <Avatar src={avatar} alt="avatar" />
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
      {type === 'local' ? <Button>가게 설정</Button> : null}
    </MyPageContainer>
  );
}

export default MyPage;
