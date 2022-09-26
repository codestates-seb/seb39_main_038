// import axios from 'axios';
import React, { useRef } from 'react';
import {
  Section,
  Title,
  MainImg,
  CreateFoodTruck,
  TypeInfo,
  Form,
  HashTagBtn,
  Hash,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
  SettingDoneBtn,
} from './styles';

function TypeInputInfo() {
  return (
    <TypeInfo>
      <input placeholder="메뉴 이름" />
      <input placeholder="메뉴 소개" />
      <input placeholder="메뉴 가격" />
      <input placeholder="소개내용 (선택)" />
    </TypeInfo>
  );
}

function FoodTruckSetting() {
  const hashTagRef = useRef(null);
  console.log(hashTagRef.current);
  // const AddMenu = () => {
  //   axios
  //     .post(
  //       'ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/menu',
  //       {
  //         name: '치킨',
  //         price: 12000,
  //       },
  //     )
  //     .then(() => {
  //       alert('success');
  //     })
  //     .catch((res) => {
  //       alert(res);
  //     });
  // };

  // const AddHashTag = () => {
  //   axios.post('uri', {
  //     tag_id: 1,
  //     store_id: 1,
  //     tag_name: hashTagRef.current.value,
  //   });
  // };

  // const onClickHandlerAddMenu = () => {
  //   AddMenu();
  // };

  return (
    <Section>
      <Title>가게 설정</Title>
      <CreateFoodTruck>
        <MainImg>
          <img alt="FoodTruckImg" />
          <button type="button">수정</button>
        </MainImg>

        <ul>
          <li>
            <TypeInfo>
              <input placeholder="상호이름 (필수)" />
            </TypeInfo>
          </li>
          <li>
            <TypeInfo>
              <input placeholder="영업시간 (필수)" />
            </TypeInfo>
          </li>
          <li>
            <TypeInfo>
              <input placeholder="주소 (필수)" />
            </TypeInfo>
          </li>
          <li>
            <TypeInfo>
              <input placeholder="전화번호 (필수)" />
            </TypeInfo>
          </li>
        </ul>
        <DeleteTag>
          {/* onClick={AddHashTag} */}
          <Form>
            <input id="tag" />
            <HashTagBtn ref={hashTagRef} htmlfor="tag">
              해시태그 추가 +
            </HashTagBtn>
          </Form>
          <Hash>
            <span>#양식asdasdsddsada</span>
            <button type="button">X</button>
          </Hash>
        </DeleteTag>

        <textarea placeholder="소개내용 (선택)" />
      </CreateFoodTruck>

      <AddFood>
        <Title>가게 메뉴 추가</Title>

        <CreateFood>
          <img alt="FoodImg" />

          <TypeInputInfo />
          {/* onClick={onClickHandlerAddMenu} */}
          <button type="button">추가</button>
        </CreateFood>

        <UpdateFood>
          <Title>가게 메뉴 편집</Title>

          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInputInfo />

            <button type="button">수정</button>
          </UpdateInput>

          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInputInfo />

            <button type="button">수정</button>
          </UpdateInput>

          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInputInfo />

            <button type="button">수정</button>
          </UpdateInput>
          <SettingDoneBtn>
            <button type="button">가게설정 완료</button>
          </SettingDoneBtn>
        </UpdateFood>
      </AddFood>
    </Section>
  );
}

export default FoodTruckSetting;
