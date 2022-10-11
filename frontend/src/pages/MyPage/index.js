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
  Avatar,
  OrderInner,
  OrderContent,
  ButtonBox,
  Button,
} from './styles';
import { ROUTE, COLOR } from '../../constants';
import { CustomModal } from '../../components';

const { AVATAR_IMG } = process.env;

function MyPage() {
  const navigate = useNavigate();
  const setOrderData = useSetRecoilState(atoms.orderData);
  const { type, state } = useRecoilValue(atoms.isLogin);
  const { data: orderListData } = useOrderList();
  const { data: userData } = useMyPage();
  const [openOrder, closeOrder] = useModal('order');
  const loginInfo = useRecoilValue(atoms.loginInfo);

  useEffect(() => {
    if (!state) {
      alert('접근할 수 없는 페이지입니다.');
      navigate('/');
    }
  }, [navigate, state]);

  if (!state) return <div />;

  const { avatar, email, name, phone } = userData.data.data;
  const goModal = (item) => () => setOrderData(item);

  const goAsk = (id) => () => {
    navigate(`/${ROUTE.REVIEW.PATH}`, {
      state: { storeId: id, type: 'post' },
    });
  };

  const goSetting = () =>
    navigate(`/trucksetting/${loginInfo.localId}`, { replace: true });

  const createOrderContent = () => {
    return orderListData.data.orders?.map((item) => {
      return (
        <OrderContent key={item.orderId} onClick={goModal(item)}>
          <TextBox>
            <Text size={14}>{item.orderMenu[0].storeName}</Text>
            <Text size={12} color="#999999">
              주문날짜: {dateFormat(new Date(item.createdAt), '.')}
            </Text>
          </TextBox>
          <ButtonBox>
            <Button
              color={COLOR.NAVY}
              onClick={goAsk(item.orderMenu[0].storeId)}
            >
              리뷰쓰기
            </Button>
            <Button color={COLOR.LIGHTNAVY} onClick={openOrder}>
              주문상세
            </Button>
          </ButtonBox>
        </OrderContent>
      );
    });
  };

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
            <Avatar src={avatar || AVATAR_IMG} alt="avatar" />
            {/*
            <Button>수정</Button>
            */}
          </AvatarBox>
        </InfoContent>
      </InfoInner>
      <OrderInner>
        <Header>주문조회</Header>
        {createOrderContent()}
      </OrderInner>
      {type === 'local' ? (
        <Button primary onClick={goSetting}>
          가게 설정
        </Button>
      ) : null}
      <CustomModal.Order closeModal={closeOrder} />
    </MyPageContainer>
  );
}

export default MyPage;
