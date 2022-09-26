import React from 'react';
import styled from 'styled-components';

const MyPageContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
`;

const InfoInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #000;
`;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span``;

const Avatar = styled.img`
  border: 1px solid #000;
  width: 64px;
  height: 64px;
`;

const Button = styled.button`
  width: 100%;
`;

const OrderInner = styled.div`
  border: 1px solid #000;
`;

const OrderHeader = styled.h1``;

const OrderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  display: flex;
  align-self: flex-end;
`;

function MyPage() {
  return (
    <MyPageContainer>
      <InfoInner>
        <TextBox>
          <Text>
            닉네임: <Text>양희준</Text>
          </Text>
          <Text>
            이메일:
            <Text>codestate@gmail.com</Text>
          </Text>
          <Text>마일리지 0 원</Text>
        </TextBox>
        <AvatarBox>
          <Avatar alt="avatar" />
          <Button>수정</Button>
        </AvatarBox>
      </InfoInner>
      <OrderInner>
        <OrderHeader>주문조회</OrderHeader>
        <OrderContent>
          <TextBox>
            <Text>KFC</Text>
            <Text>주문날짜: 2020.09.21</Text>
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
