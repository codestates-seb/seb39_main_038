import styled from 'styled-components';

const ServerErrorContainer = styled.div`
  height: calc(100vh - 80px);
  display: flex;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 96px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.span`
  font-size: 36px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 15px;
`;

export { ServerErrorContainer, Title, Content, Text, Button };
