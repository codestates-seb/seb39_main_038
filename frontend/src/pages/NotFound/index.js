import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE, TEXT } from '../../constants';
import { NotFoundContainer, Title, Content, Text, Button } from './styles';

function NotFound() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(ROUTE.HOME.PATH, { replace: true });
  return (
    <NotFoundContainer>
      <Title>{ROUTE.NOTFOUND.NAME}</Title>
      <Content>
        <Text>{TEXT.NOTFOUND.PAGE_NOTFOUND}</Text>
        <Text>{TEXT.NOTFOUND.WRONG_PATH}</Text>
      </Content>
      <Button onClick={handleOnClick}>{TEXT.NOTFOUND.GO_HOME}</Button>
    </NotFoundContainer>
  );
}

export default NotFound;
