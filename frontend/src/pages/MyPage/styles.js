import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

const MyPageContainer = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
  gap: 15px;
`;

const Header = styled.h1`
  font-size: 16px;
  padding: 10px 15px;
  background-color: #e6e6e6;
`;

const InfoInner = styled.div`
  border: 1px solid #ddd;
`;

const InfoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`;

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Text = styled.span`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

const Avatar = styled.img`
  width: 64px;
  height: 64px;
`;

const Button = styled.button`
  width: 100%;
  padding: 6px 12px;
  font-size: 12px;
  background-color: transparent;
  border: 1px solid ${({ color }) => color};
  color: ${({ color }) => color};
  ${({ primary }) =>
    primary &&
    css`
      background-color: ${COLOR.NAVY};
      border: 1px solid ${COLOR.NAVY};
      color: ${COLOR.WHITE};
      padding: 10px 15px;
    `}
`;

const OrderInner = styled.div`
  border: 1px solid #ddd;
`;

const OrderContent = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding: 10px 15px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 5px;
`;

export {
  MyPageContainer,
  Header,
  InfoInner,
  InfoContent,
  AvatarBox,
  TextBox,
  Text,
  Avatar,
  Button,
  OrderInner,
  OrderContent,
  ButtonBox,
};
