import React from 'react';
import {
  Section,
  Title,
  CreateFoodTruck,
  TypeInfo,
  Hashtag,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
} from './styles';

function FoodTruckSetting() {
  return (
    <Section>
      <Title>가게 메뉴</Title>
      <CreateFoodTruck>
        <div>
          <img alt="FoodTruckImg" />
          <button type="button">수정</button>
        </div>

        <TypeInfo>
          <input />
          <input />
          <input />
          <input />
        </TypeInfo>

        <DeleteTag>
          <Hashtag type="button">해시 태그 추가 +</Hashtag>
          <span>#양식</span>
          <button type="button">X</button>
        </DeleteTag>

        <textarea />
      </CreateFoodTruck>

      <AddFood>
        <CreateFood>
          <img alt="FoodImg" />

          <TypeInfo>
            <input />
            <input />
            <input />
            <input />
          </TypeInfo>

          <button type="button">추가</button>
        </CreateFood>

        <UpdateFood>
          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInfo>
              <input />
              <input />
              <input />
            </TypeInfo>

            <button type="button">수정</button>
          </UpdateInput>

          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInfo>
              <input />
              <input />
              <input />
            </TypeInfo>

            <button type="button">수정</button>
          </UpdateInput>

          <UpdateInput>
            <img alt="FoodImg" />

            <TypeInfo>
              <input />
              <input />
              <input />
            </TypeInfo>

            <button type="button">수정</button>
          </UpdateInput>
        </UpdateFood>
      </AddFood>
      <button type="button">가게설정 완료</button>
    </Section>
  );
}

export default FoodTruckSetting;
