import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { atoms } from '../../store';
import { useMyPage, useOrderList, useModal } from '../../hooks';
import { dateFormat } from '../../utils';
import {
  MyPageContainer,
  InfoInner,
  Header,
  InfoContent,
  TextBox,
  Text,
  AvatarBox,
  OrderInner,
  Button,
} from './styles';
import { CustomModal } from '../../components';

// const { AVATAR_IMG } = process.env;

function MyPage() {
  const navigate = useNavigate();
  const { type, state } = useRecoilValue(atoms.isLogin);
  const { data: userData } = useMyPage();
  const [closeOrder] = useModal('order');

  useEffect(() => {
    if (!state) {
      alert('접근할 수 없는 페이지입니다.');
      navigate('/');
    }
  }, [navigate, state]);

  if (!state) return <div />;

  const { email = 1, name = 1, phone = 1 } = userData.data.data;

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
            <Button>수정</Button>
          </AvatarBox>
        </InfoContent>
      </InfoInner>
      <OrderInner>
        <Header>주문조회</Header>
      </OrderInner>
      {type === 'local' ? <Button>가게 설정</Button> : null}
      <CustomModal.Order closeModal={closeOrder} />
    </MyPageContainer>
  );
}

export default MyPage;
