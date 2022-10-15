import styled, { css } from 'styled-components';
import { COLOR } from '../../constants';

const Container = styled.div`
  max-width: 660px;
  margin: 0 auto;
  padding: 10px 0px;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  ${({ primary }) =>
    primary &&
    css`
      padding: 10px 15px;
      border: 1px solid ${COLOR.NAVY};
      background-color: ${COLOR.NAVY};
      color: ${COLOR.WHITE};
    `}
`;

const FileInput = styled.input`
  display: none;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Editor = styled.textarea`
  resize: none;
  height: 180px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #666666;
`;

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
`;

const View = styled.div`
  border: 1px solid #ccc;
  padding: 10px 15px;
  ${({ isUrl }) =>
    isUrl &&
    css`
      height: 180px;
    `}
`;

const ViewImage = styled.div`
  width: 100%;
  height: 350px;
  background: url(${({ url }) => url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  ${({ url }) =>
    url === null &&
    css`
      display: none;
    `}
`;

const Text = styled.span`
  font-size: ${({ size }) => size};
  color: ${({ color }) => color};
`;

export {
  Container,
  EditorWrapper,
  Button,
  FileInput,
  Header,
  Editor,
  ViewWrapper,
  View,
  ViewImage,
  Text,
};
