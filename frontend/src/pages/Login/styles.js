import styled from 'styled-components';

const Logo = styled.div`
  height: 45px;
  background-color: red;
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

export { Logo, LoginInner, FindInner, FindText };
