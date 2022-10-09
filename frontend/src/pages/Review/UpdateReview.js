import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useReview } from '../../hooks';
import { ROUTE } from '../../constants';
import {
  Container,
  EditorWrapper,
  Editor,
  Header,
  Text,
  Button,
  ViewWrapper,
  ViewImage,
  View,
  FileInput,
} from './styles';

function UpdateReview({ storeId, reviewId }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { updateMutate } = useReview(storeId);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const data = queryClient.getQueryData(['review', storeId]);

      if (!data) return alert('예외처리');

      const { reviewContent, reviewImage } = data.data.reviews[reviewId];
      if (data.data.reviews[reviewId]) {
        setText(reviewContent);
        setImgSrc(reviewImage);
      }
    } catch (err) {
      console.log(err);
    }
  }, [queryClient, reviewId, storeId]);

  const fileLoderRef = useRef(null);
  const handleOnClick = () => fileLoderRef.current.click();
  const handleOnChangeEditer = (e) => setText(e.target.value);

  const handleOnChangeFile = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  }, []);

  const handleOnClickUpdate = () => {
    updateMutate({
      sid: storeId,
      rid: reviewId,
      value: { reviewContent: text, reviewImage: imgSrc },
    });
    navigate(`${ROUTE.FOODLIST.PATH}/${storeId}`);
  };

  return (
    <Container>
      <EditorWrapper>
        <Header>
          <Text as="h1" size={18}>
            리뷰수정
          </Text>
          <Button onClick={handleOnClick}>사진 업로드</Button>
        </Header>
        <Editor
          onChange={handleOnChangeEditer}
          placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요."
          value={text || ' '}
        />
      </EditorWrapper>

      <ViewWrapper>
        <Text as="h1" size={18}>
          미리보기
        </Text>
        <View isUrl={!imgSrc}>
          <ViewImage url={imgSrc} alt="food" />
          <Text size={14} color="#666666">
            {text}
          </Text>
        </View>
        <Button onClick={handleOnClickUpdate}>전송</Button>
      </ViewWrapper>

      <FileInput
        ref={fileLoderRef}
        onChange={handleOnChangeFile}
        type="file"
        accept="image/*"
      />
    </Container>
  );
}

export default UpdateReview;
