import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Header,
  Text,
  TextWrapper,
  Button,
  Editor,
  EditorWrapper,
  Answer as AnswerContainer,
  ButtonWrapper,
} from './styles';
import { useAnswer } from '../../hooks';
import { atoms } from '../../store';
import { dateFormat } from '../../utils';

function Answer({ item, storeId }) {
  const [toggle, isToggle] = useState(false);
  const [text, setText] = useState('');
  const { createMutate, updateMutate, deleteMutate } = useAnswer(storeId);
  const loginInfo = useRecoilValue(atoms.loginInfo);

  const handleOnClick = () => isToggle(!toggle);
  const handleOnChange = (e) => setText(e.target.value);
  const authCheck = loginInfo.storeId === Number(storeId);

  const postData = () => {
    createMutate({
      id: item.reviewId,
      value: {
        storeId,
        reviewId: item.reviewId,
        commentContent: text,
      },
    });

    isToggle(!toggle);
  };

  const updateData = () => {
    updateMutate({
      id: item.reviewId,
      value: {
        storeId,
        reviewId: item.reviewId,
        commentId: item.comment.commentId,
        commentContent: text,
      },
    });

    isToggle(!toggle);
  };

  const deleteData = () => {
    deleteMutate({
      id: item.reviewId,
      value: { commentId: item.comment.commentId },
    });
  };

  return (
    <>
      {!item.comment && authCheck ? (
        <Button onClick={handleOnClick} style={{ alignSelf: 'flex-end' }}>
          답변
        </Button>
      ) : null}

      {toggle ? (
        <EditorWrapper>
          <Editor
            onChange={handleOnChange}
            placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요."
          />
          <Button onClick={!item.comment ? postData : updateData}>전송</Button>
        </EditorWrapper>
      ) : null}

      {item.comment ? (
        <AnswerContainer>
          <Header>
            <TextWrapper>
              <Text as="h1">사장님</Text>
              <Text size={12} color="#999999">
                {dateFormat(new Date(item?.comment.createdAt), '-')}
              </Text>
            </TextWrapper>
            {authCheck ? (
              <ButtonWrapper>
                <Button onClick={handleOnClick}>수정</Button>
                <Button onClick={deleteData}>삭제</Button>
              </ButtonWrapper>
            ) : null}
          </Header>
          <Text size={14} color="#666666">
            {item?.comment.commentContent}
          </Text>
        </AnswerContainer>
      ) : null}
    </>
  );
}

export { Answer };
