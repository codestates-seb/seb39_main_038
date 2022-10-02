import React, { useState, useRef, useCallback } from 'react';
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

function Review() {
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState(null);

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

  return (
    <Container>
      <EditorWrapper>
        <Header>
          <Text as="h1" size={18}>
            리뷰작성
          </Text>
          <Button onClick={handleOnClick}>사진 업로드</Button>
        </Header>
        <Editor
          onChange={handleOnChangeEditer}
          placeholder="클린리뷰 특성상 재생성도 불가능하며 수정도 불가능합니다. 신중하게 작성해주세요."
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
        <Button>전송</Button>
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

export default Review;
