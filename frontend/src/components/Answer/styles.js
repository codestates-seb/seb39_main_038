import styled, { css } from 'styled-components';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  @media screen and (min-width: 767px) {
    width: 100%;
  }
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  height: 100px;
  border: 1px solid #ccc;
`;

const TotalRate = styled.div`
  font-size: 48px;
  font-weight: bold;
  padding-bottom: 5px;
`;

const Star = styled.span`
  color: #ffa400;
  font-size: 14px;
  ${({ header }) =>
    header &&
    css`
      padding-top: 5px;
    `}
`;

const Comment = styled.div`
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Text = styled.span`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.a`
  color: #999999;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 350px;
`;

const Answer = styled.div`
  padding: 16px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
  h1::before {
    content: '↪';
    padding-right: 4px;
  }
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  a {
    align-self: flex-end;
  }
`;

const Editor = styled.textarea`
  width: 100%;
  height: 220px;
  color: #666666;
  font-size: 14px;
  resize: none;
`;

export {
  ReviewContainer,
  Rating,
  TotalRate,
  Star,
  Comment,
  Header,
  TextWrapper,
  Text,
  ButtonWrapper,
  Button,
  Image,
  Answer,
  EditorWrapper,
  Editor,
};
