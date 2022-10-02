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
  Answer,
  EditorWrapper,
  Editor,
} from './styles';
// import { storge } from '../../store';

function DetailReview() {
  return (
    <ReviewContainer>
      <Rating>
        <TotalRate>5.0</TotalRate>
        <Star header>★★★★★</Star>
      </Rating>
      <Comment>
        <Header>
          <TextWrapper>
            <Text as="h1" size={16} color="#333333">
              김재원님
            </Text>
            <Text size={12} color="#999999">
              2022-09-21
            </Text>
          </TextWrapper>
          <ButtonWrapper>
            <Button>답변</Button>
            <Button>삭제</Button>
          </ButtonWrapper>
        </Header>
        <TextWrapper>
          <Text as="h1" size={14} color="#ffa400">
            별점
          </Text>
          <Star>★★★★★</Star>
        </TextWrapper>
        <Image alt="food" />
        <Text size={14} color="#666666">
          사장님도 친절하시고, 양도 많고 엄청 신선했습니다! 많이 시켜먹을 것
          같습니다!
        </Text>

        <EditorWrapper>
          <Editor placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요." />
          <Button>전송</Button>
        </EditorWrapper>

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
      </Comment>
    </ReviewContainer>
  );
}

export { DetailReview };
