import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
  Editor,
  EditorWrapper,
  Answer,
} from './styles';
import { useReview, useAnswer } from '../../hooks';
import { ROUTE } from '../../constants';
import { dateFormat } from '../../utils';

function DetailReview({ storeId }) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState('');
  const { data, deleteMutate } = useReview(storeId);
  const { fetchCreateAnswer } = useAnswer(storeId);

  const createStar = (n) => {
    let stars = '';
    for (let i = 0; i < parseInt(n, 10); i += 1) stars += '★';
    return stars;
  };

  const handleToggle = () => setToggle(!toggle);

  const goUpdate = (sid, rid) => () =>
    navigate(`/${ROUTE.REVIEW.PATH}`, {
      state: { storeId: sid, reviewId: rid },
    });

  const goDelete = (sid, rid) => () => {
    const isCheck = window.confirm('정말 지우시겠습니까?');
    if (isCheck) return deleteMutate({ sid, rid });
    return null;
  };

  const goAnswer = (reviewId, commentContent) => () => {
    setToggle(!toggle);
    fetchCreateAnswer({
      id: storeId,
      value: { storeId, reviewId, commentContent },
    });
  };

  const createComment = () => {
    return data?.data.reviews.map((item) => {
      console.log(data.data.reviews);
      return (
        <Comment key={item.reviewId}>
          <Header>
            <TextWrapper>
              <Text as="h1" size={16} color="#333333">
                {item.reviewName}님
              </Text>
              <Text size={12} color="#999999">
                {dateFormat(new Date(item.createdAt), '-')}
              </Text>
            </TextWrapper>
            <ButtonWrapper>
              <Button onClick={goUpdate(storeId, item.reviewId)}>수정</Button>
              <Button onClick={goDelete(storeId, item.reviewId)}>삭제</Button>
              <Button onClick={handleToggle}>답변</Button>
            </ButtonWrapper>
          </Header>
          <TextWrapper>
            <Text as="h1" size={14} color="#ffa400">
              별점
            </Text>
            <Star>{createStar(item.reviewGrade)}</Star>
          </TextWrapper>

          {item.reviewImage ? (
            <Image alt="food" src={item.reviewImage} />
          ) : null}

          <Text size={14} color="#666666">
            {item.reviewContent}
          </Text>
          {toggle ? (
            <EditorWrapper>
              <Editor
                onChange={(e) => setText(e.target.value)}
                placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요."
              />
              <Button onClick={goAnswer(item.reviewId, text)}>전송</Button>
            </EditorWrapper>
          ) : null}
          <Answer>
            <Header>
              <TextWrapper>
                <Text as="h1">사장님</Text>
                <Text size={12} color="#999999">
                  {dateFormat(new Date(item.comment.createdAt), '-')}
                </Text>
              </TextWrapper>
              <Button>삭제</Button>
            </Header>
            <Text size={14} color="#666666">
              {item.comment.commentContent}
            </Text>
          </Answer>
        </Comment>
      );
    });
  };

  return (
    <ReviewContainer>
      <Rating>
        <TotalRate>5.0</TotalRate>
        <Star header>★★★★★</Star>
      </Rating>
      {createComment()}
    </ReviewContainer>
  );
}

export { DetailReview };
