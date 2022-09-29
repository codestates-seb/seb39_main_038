import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { API_URI, ROUTE } from '../../constants';
import { atoms } from '../../store';
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
  const navigate = useNavigate();
  const { type } = useRecoilValue(atoms.isLogin);

  const fetchLocalMypage = (loginType) => {
    return async () => {
      let api;
      if (loginType === 'local') api = API_URI.LOCAL_MYPAGE;
      if (loginType === 'kakao') api = API_URI.KAKAO_MYPAGE;
      const response = await axios.post(api, {});
      return response;
    };
  };

  const { data, isError } = useQuery(['mypage'], fetchLocalMypage(type));
  if (isError) return navigate(`/${ROUTE.NOTFOUND.PATH}`, { replace: true });

  const createUserInfo = () => {
    if (type === 'local') {
      const { avatar, email, name, phone } = data?.data ?? null;
      return (
        <>
          <TextBox>
            <Text size={14}>{`닉네임: ${name}`}</Text>
            <Text size={14}>{`이메일: ${email}`}</Text>
            <Text size={14}>{`핸드폰 번호: ${phone}`}</Text>
          </TextBox>
          <AvatarBox>
            <Avatar src={avatar} alt="avatar" />
            <Button>수정</Button>
          </AvatarBox>
        </>
      );
    }
    if (type === 'kakao') {
      const { email, nickname, profileImage } = data.data;
      return (
        <>
          <TextBox>
            <Text size={14}>{`닉네임: ${nickname}`}</Text>
            <Text size={14}>{`이메일: ${email}`}</Text>
          </TextBox>
          <AvatarBox>
            <Avatar src={profileImage} alt="avatar" />
            <Button>수정</Button>
          </AvatarBox>
        </>
      );
    }
    return null;
  };

  return (
    <MyPageContainer>
      <InfoInner>
        <Header>유저정보</Header>
        <InfoContent>{createUserInfo()}</InfoContent>
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
      {type === 'kakao' ? <Button>가게 설정</Button> : null}
    </MyPageContainer>
  );
}

export default MyPage;
