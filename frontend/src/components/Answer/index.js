import React, { useState } from 'react';
import {
  Header,
  Text,
  TextWrapper,
  Button,
  Editor,
  EditorWrapper,
  Answer as AnswerContainer,
} from './styles';
import { useAnswer } from '../../hooks';
import { dateFormat } from '../../utils';

function Answer({ item, storeId }) {
  const [toggle, isToggle] = useState(false);
  const [text, setText] = useState('');
  const { createMutate } = useAnswer();

  const handleOnClick = () => isToggle(!toggle);
  const handleOnChange = (e) => setText(e.target.value);
  console.log('item', item);
  return (
    <>
      <Button onClick={handleOnClick}> 답변 </Button>

      {toggle ? (
        <EditorWrapper>
          <Editor
            onChange={handleOnChange}
            placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요."
          />
          <Button
            onClick={() => {
              createMutate({
                id: storeId,
                value: {
                  storeId,
                  reviewId: item.reviewIdv,
                  commentContent: text,
                },
              });
            }}
          >
            전송
          </Button>
        </EditorWrapper>
      ) : null}

      <AnswerContainer>
        <Header>
          <TextWrapper>
            <Text as="h1">사장님</Text>
            <Text size={12} color="#999999">
              {dateFormat(new Date(item?.comment.createdAt), '-')}
            </Text>
          </TextWrapper>
          <Button>삭제</Button>
        </Header>
        <Text size={14} color="#666666">
          {item?.comment.commentContent}
        </Text>
      </AnswerContainer>
    </>
  );
}

export { Answer };
