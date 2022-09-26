import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants';
import { NotFoundContainer, Title, Content, Text, Button } from './styles';

function NotFound() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(ROUTE.HOME.PATH, { replace: true });
  return (
    <NotFoundContainer>
      <Title>{ROUTE.NOTFOUND.NAME}</Title>
      <Content>
        <Text>찾을 수 없는 페이지 입니다.</Text>
        <Text>잘못된 경로를 사용하셨어요 :)</Text>
      </Content>
      <Button onClick={handleOnClick}>홈으로 이동</Button>
    </NotFoundContainer>
  );
}

export default NotFound;
