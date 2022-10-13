import React from 'react';
import {
  MainImg,
  Dropdown,
  CreateFoodTruck,
  TypeInfo,
  HashTagBtn,
  DeleteTag,
  Avatar,
} from '../styles';
import { useFoodDetail } from '../../../hooks';

function UpdateForm({
  img,
  onChange,
  name,
  time,
  address,
  phone,
  number,
  tag,
  ask,
  categories,
  dropDown,
  handleTypeChange,
  storeId,
  onChangeImg,
  SetStoreName,
  SetStoreImage,
  SetStoreContent,
  SetStoreTag,
  SetStoreTime,
  SetStorePhone,
  SetStoreAddress,
  SetStoreNumber,
}) {
  const { data } = useFoodDetail(storeId);
  // console.log(data);

  const {
    storeName,
    storeImage,
    storeContent,
    storeTag,
    storeTime,
    storePhone,
    storeAddress,
    storeNumber,
  } = data.data.data;

  if (storeId) {
    SetStoreName(storeName);
    SetStoreImage(storeImage);
    SetStoreContent(storeContent);
    SetStoreTag(storeTag);
    SetStoreTime(storeTime);
    SetStorePhone(storePhone);
    SetStoreAddress(storeAddress);
    SetStoreNumber(storeNumber);
  }

  return (
    <CreateFoodTruck>
      <MainImg>
        <Avatar>
          <div>
            <img alt="새로운 메뉴 이미지" src={img || storeImage} />
            <label htmlFor="file">수정</label>
            <input
              type="file"
              id="file"
              onChange={onChangeImg}
              accept="image/*"
            />
          </div>
        </Avatar>

        <Dropdown>
          <select type="button" onChange={handleTypeChange} value={dropDown}>
            {categories.map((res, index) => {
              return (
                <option key={res.type} id={`${index}`} value={res.value}>
                  {res.type}
                </option>
              );
            })}
          </select>
        </Dropdown>
      </MainImg>

      <ul>
        <li>
          <TypeInfo>
            <input
              placeholder={storeName}
              name="name"
              value={name}
              onChange={onChange}
            />
          </TypeInfo>
        </li>

        <li>
          <TypeInfo>
            <input
              placeholder={storeTime}
              name="time"
              value={time}
              onChange={onChange}
            />
          </TypeInfo>
        </li>

        <li>
          <TypeInfo>
            <input
              placeholder={storeAddress}
              name="address"
              value={address}
              onChange={onChange}
            />
          </TypeInfo>
        </li>

        <li>
          <TypeInfo>
            <input
              placeholder={storePhone}
              name="phone"
              value={phone}
              onChange={onChange}
            />
          </TypeInfo>
        </li>

        <li>
          <TypeInfo>
            <input
              placeholder={storeNumber}
              name="number"
              value={number}
              onChange={onChange}
            />
          </TypeInfo>
        </li>
      </ul>

      <DeleteTag>
        <input
          placeholder={storeTag}
          value={tag}
          name="tag"
          onChange={onChange}
        />

        <HashTagBtn
          onClick={() => {
            alert('적용 완료');
          }}
        >
          해시태그 변경
        </HashTagBtn>
      </DeleteTag>

      <textarea
        placeholder={storeContent}
        name="ask"
        value={ask}
        onChange={onChange}
      />
    </CreateFoodTruck>
  );
}

export default UpdateForm;
