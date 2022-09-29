import axios from 'axios';
import React, { useState } from 'react';
import {
  Section,
  Title,
  MainImg,
  Dropdown,
  CreateFoodTruck,
  TypeInfo,
  HashTagBtn,
  Hash,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
  SettingDoneBtn,
} from './styles';

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState('종류를 선택하세요');
  const [inputs, setInputs] = useState({
    img: '',
    name: '',
    time: '',
    address: '',
    phone: '',
    tag: '',
    ask: '',
    newMenuName: '',
    newMenuPrice: '',
    newMenuContent: '',
    newMenuImg: '',
    menuName: '',
    menuPrice: '',
    menuContent: '',
    menuImg: '',
  });

  const {
    img,
    name,
    time,
    address,
    phone,
    tag,
    ask,
    newMenuName,
    newMenuPrice,
    newMenuContent,
    newMenuImg,
    menuName,
    menuPrice,
    menuContent,
    menuImg,
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setDropDown(e.target.value);
  };

  const AddMenu = () => {
    axios
      .post(
        'ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/menu',
        {
          name: '치킨',
          price: 12000,
        },
      )
      .then(() => {
        alert('success');
      })
      .catch((res) => {
        alert(res);
      });
  };

  const onClickHandlerAddMenu = () => {
    AddMenu();
  };

  const AddHashTag = () => {
    axios.post('uri', {
      tag_id: 1,
      store_id: 1,
      tag_name: tag,
    });
  };

  // const postInfo = () => {
  //   const posting = async () => {
  //     axios.post('/store/ask', {});
  //   };
  // };

  const storeType = [
    { id: null, value: '종류를 선택하세요' },
    { id: 1, value: '한식' },
    { id: 2, value: '중식' },
    { id: 3, value: '양식' },
    { id: 4, value: '일식' },
    { id: 5, value: '분식' },
    { id: 6, value: '디저트' },
  ];

  return (
    <Section>
      <Title>가게 설정</Title>

      <CreateFoodTruck>
        <MainImg>
          <span>
            <img
              alt="FoodTruckImg"
              name="img"
              value={img}
              onChange={onChange}
            />
          </span>

          <Dropdown>
            <select type="button" onChange={handleTypeChange} value={dropDown}>
              {storeType.map((e) => {
                return <option key={e.id}>{e.value}</option>;
              })}
            </select>
          </Dropdown>
        </MainImg>

        <ul>
          <li>
            <TypeInfo>
              <input
                placeholder="상호이름 (필수)"
                name="name"
                value={name}
                onChange={onChange}
              />
            </TypeInfo>
          </li>

          <li>
            <TypeInfo>
              <input
                placeholder="영업시간 (필수)"
                name="time"
                value={time}
                onChange={onChange}
              />
            </TypeInfo>
          </li>

          <li>
            <TypeInfo>
              <input
                placeholder="주소 (필수)"
                name="address"
                value={address}
                onChange={onChange}
              />
            </TypeInfo>
          </li>

          <li>
            <TypeInfo>
              <input
                placeholder="전화번호 (필수)"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </TypeInfo>
          </li>
        </ul>

        <DeleteTag>
          <input value={tag} name="tag" onChange={onChange} />

          <HashTagBtn onClick={AddHashTag}>해시태그 추가 +</HashTagBtn>

          <Hash>
            <span>#양식asdasdsddsada</span>
            <button type="button">X</button>
          </Hash>
        </DeleteTag>

        <textarea
          placeholder="소개내용 (선택)"
          name="ask"
          value={ask}
          onChange={onChange}
        />
      </CreateFoodTruck>

      <AddFood>
        <Title>가게 메뉴 추가</Title>

        <CreateFood>
          <img
            alt="FoodImg"
            name="newMenuImg"
            value={newMenuImg}
            onChange={onChange}
          />

          <TypeInfo>
            <input
              placeholder="메뉴 이름"
              name="newMenuName"
              value={newMenuName}
              onChange={onChange}
            />

            <input
              placeholder="메뉴 소개"
              name="newMenuContent"
              value={newMenuContent}
              onChange={onChange}
            />

            <input
              placeholder="메뉴 가격"
              name="newMenuPrice"
              value={newMenuPrice}
              onChange={onChange}
            />
          </TypeInfo>

          <button type="button" onClick={onClickHandlerAddMenu}>
            추가
          </button>
        </CreateFood>

        <UpdateFood>
          <Title>가게 메뉴 편집</Title>

          <UpdateInput>
            <img
              alt="FoodImg"
              name="menuImg"
              value={menuImg}
              onChange={onChange}
            />

            <TypeInfo>
              <input
                placeholder="메뉴 이름"
                name="menuName"
                value={menuName}
                onChange={onChange}
              />

              <input
                placeholder="메뉴 소개"
                name="menuContent"
                value={menuContent}
                onChange={onChange}
              />

              <input
                placeholder="메뉴 가격"
                name="menuPrice"
                value={menuPrice}
                onChange={onChange}
              />
            </TypeInfo>

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
