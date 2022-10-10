import React from 'react';
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
} from './styles';
import { useReview } from '../../hooks';
import { ROUTE } from '../../constants';
import { dateFormat } from '../../utils';
import { Answer } from '../Answer';

function DetailReview({ storeId }) {
  const navigate = useNavigate();
  const { data, deleteMutate } = useReview(storeId);

  const createStar = (n) => {
    let stars = '';
    for (let i = 0; i < parseInt(n, 10); i += 1) stars += '★';
    return stars;
  };

  const goUpdate = (sid, rid) => () =>
    navigate(`/${ROUTE.REVIEW.PATH}`, {
      state: { storeId: sid, reviewId: rid },
    });

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
                {item.nickname}님
              </Text>
              <Text size={12} color="#999999">
                {dateFormat(new Date(item.createdAt), '-')}
              </Text>
            </TextWrapper>
            {item.auth ? (
              <ButtonWrapper>
                <Button onClick={goUpdate(storeId, item.reviewId)}>수정</Button>
                <Button onClick={goDelete(storeId, item.reviewId)}>삭제</Button>
              </ButtonWrapper>
            ) : null}
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

          <Answer item={item} storeId={storeId} />
        </Comment>
      );
    });
  };

  return (
    <ReviewContainer>
      <Rating>
        <TotalRate>{data?.data.totalGrade}</TotalRate>
        <Star header>{createStar(data?.data.totalGrade)}</Star>
      </Rating>
      {createComment()}
    </ReviewContainer>
  );
}

export { DetailReview };
