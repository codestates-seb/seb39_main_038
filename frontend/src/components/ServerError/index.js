import React from 'react';
import { ServerErrorContainer, Title, Content, Text, Button } from './styles';

function ServerError({ resetErrorBoundary }) {
  return (
    <ServerErrorContainer>
      <Title>500</Title>
      <Content>
        <Text>서버와 전송을 실패하였습니다.</Text>
        <Text>잠시후에 서버 재전송 버튼을 눌러주세요!! :)</Text>
      </Content>
      <Button onClick={resetErrorBoundary}>서버 재전송</Button>
    </ServerErrorContainer>
  );
}

export { ServerError };
