import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Logo = styled.div`
  height: 45px;
  background-color: red;
`;

const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const LoginInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FindInner = styled.span`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0px;
  a:first-child::after {
    content: '|';
    line-height: 1.4;
    padding-left: 4px;
  }
  a:last-child {
    padding-left: 4px;
    line-height: 1.4;
  }
`;

const FindText = styled.a`
  text-decoration: none;
  font-size: 14px;
  color: #999999;
  cursor: pointer;
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

export {
  LoginContainer,
  Logo,
  LoginWrapper,
  LoginInner,
  FindInner,
  FindText,
  Input,
  Button,
};
