import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const Input = styled.input`
  font-size: 14px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
`;

const Button = styled.button`
  font-size: 14px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 2px;
  background-color: transparent;
`;

export { LoginContainer, LoginWrapper, Input, Button };
