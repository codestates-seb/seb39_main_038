import React from 'react';
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
} from './styles';
import { useReview } from '../../hooks';
import { dateFormat } from '../../utils';

/* 답장 기능 주석 처리
<EditorWrapper>
  <Editor placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요." />
  <Button>전송</Button>
</EditorWrap
<Answer>
  <Header>
    <TextWrapper>
      <Text as="h1">사장님</Text>
      <Text size={12} color="#999999">
        2022-09-21
      </Text>
    </TextWrapper>
    <Button>삭제</Button>
  </Header>
  <Text size={14} color="#666666">
    안녕하세용~~~~ 감사합니다.
  </Text>
</Answer>
*/

function DetailReview({ storeId }) {
  const { data, deleteMutate, updateMutate } = useReview(storeId);

  const createStar = (n) => {
    let stars = '';
    for (let i = 0; i < parseInt(n, 10); i += 1) stars += '★';
    return stars;
  };

  const goUpdate = (sid, rid, value) => () => {
    updateMutate({ sid, rid, value });
  };

  const goDelete = (sid, rid) => () => {
    const isCheck = window.confirm('정말 지우시겠습니까?');
    if (isCheck) return deleteMutate({ sid, rid });
    return null;
  };

  const createComment = () => {
    return data?.data.reviews.map((item) => {
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
              <Button
                onClick={goUpdate(storeId, item.reviewId, {
                  reviewContent: '수정된 내용',
                })}
              >
                수정
              </Button>
              <Button onClick={goDelete(storeId, item.reviewId)}>삭제</Button>
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
