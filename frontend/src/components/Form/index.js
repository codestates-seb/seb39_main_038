import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const Text = styled.p`
  color: #666;
  font-size: 14px;
  &::before {
    content: '·';
  }
`;

const Input = styled.input`
  font-size: 14px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
`;

const Button = styled.button`
  font-size: 15px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: transparent;
`;

const Form = {
  Container,
  Wrapper,
  Text,
  Input,
  Button,
};

export { Form };
