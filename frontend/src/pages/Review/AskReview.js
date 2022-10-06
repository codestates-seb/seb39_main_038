import React, { useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
import { useReview } from '../../hooks';

function AskReview() {
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState(null);
  const [star, setStar] = useState(1);
  const location = useLocation();
  const { createMutate } = useReview(location.state.storeId);

  const fileLoderRef = useRef(null);

  const handleOnClick = () => fileLoderRef.current.click();
  const handleOnChangeEditer = (e) => setText(e.target.value);
  const handleOnchange = (e) => setStar(e.target.value);

  const hanldeOnPost = () => {
    createMutate({
      sid: location.state.storeId,
      value: { reviewContent: text, reviewImage: imgSrc, reviewGrade: star },
    });
  };

  const handleOnChangeFile = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgSrc(reader.result);
    };
  }, []);

  const createSelect = () => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <label style={{ marginRight: 2 }}>
        별점을 선택해주세요.
        <select value={undefined} onChange={handleOnchange}>
          {stars.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <Container>
      <EditorWrapper>
        <Header>
          <Text as="h1" size={18}>
            리뷰작성
          </Text>
          <Button onClick={handleOnClick}>사진 업로드</Button>
          {createSelect()}
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
        <Button onClick={hanldeOnPost}>전송</Button>
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

export default AskReview;
