import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import {
  Section,
  Title,
  MainImg,
  Dropdown,
  CreateFoodTruck,
  TypeInfo,
  HashTagBtn,
  DeleteTag,
  AddFood,
  CreateFood,
  UpdateFood,
  UpdateInput,
  SettingDoneBtn,
  Toggle,
  OpenOrClose,
} from './styles';
import { Spinner, ErrorBoundary } from '../../components';
import { COLOR } from '../../constants';

import { useFoodDetail, useDetailFoodList } from '../../hooks';

function FoodMenusList() {
  const { id } = useParams();
  const { data } = useDetailFoodList(id);

  const [menuId, setMenuId] = useState(null);
  const [inputs, setInputs] = useState({
    menuName: '',
    menuPrice: '',
    menuContent: '',
    menuImg: null,
  });

  const { menuName, menuPrice, menuContent, menuImg } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const deleteMenu = async () => {
    const res = await axios.delete(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${id}/menus/${menuId}`,
    );
    return res;
  };

  const patchMenu = async () => {
    const res = await axios.patch(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${id}/menus/${menuId}`,
      {
        name: menuName,
        price: menuPrice,
        content: menuContent,
        image: menuImg,
      },
    );
    return res;
  };

  const onSuccess = () => {
    alert('성공2');
  };

  const onError = () => {
    alert('실패2');
  };

  const onSettled = () => {
    alert('처리종료2');
  };

  const { mutate: deleteMutateMenu } = useMutation(deleteMenu, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: patchMutateMenu } = useMutation(patchMenu, {
    onSuccess,
    onError,
    onSettled,
  });

  return data.data.menus.map((res) => (
    <UpdateInput key={res.menuId}>
      <img
        alt="FoodImg"
        name={`menuImg${menuId}`}
        value={menuImg}
        onChange={onChange}
        src={res.image}
      />

      <TypeInfo>
        <input
          placeholder={res.name}
          name={`menuName${menuId}`}
          value={menuName}
          onChange={onChange}
          onClick={() => {
            setMenuId(res.menuId);
          }}
        />

        <input
          placeholder={res.content}
          name={`menuContent${menuId}`}
          value={menuContent}
          onChange={onChange}
          onClick={() => {
            setMenuId(res.menuId);
          }}
        />

        <input
          placeholder={res.price}
          name={`menuPrice${menuId}`}
          value={menuPrice}
          onChange={onChange}
          onClick={() => {
            setMenuId(res.menuId);
          }}
        />
      </TypeInfo>

      <button
        type="button"
        onClick={() => {
          patchMutateMenu();
        }}
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => {
          deleteMutateMenu();
        }}
      >
        제거
      </button>
    </UpdateInput>
  ));
}

function UpdateForm({
  img,
  onChange,
  handleTypeChange,
  dropDown,
  type,
  name,
  time,
  address,
  phone,
  number,
  tag,
  ask,
}) {
  const { id } = useParams();
  const { data } = useFoodDetail(id);

  const {
    storeName,
    storeImage,
    storeContent,
    storeTag,
    storeTime,
    storePhone,
    storeAddress,
    storeNumber,
    // storeType,
  } = data.data.data;

  return (
    <CreateFoodTruck>
      <MainImg>
        <div>
          <img
            alt="FoodTruckImg"
            name="img"
            src={storeImage}
            value={img}
            onChange={onChange}
          />
        </div>

        <Dropdown>
          <select type="button" onChange={handleTypeChange} value={dropDown}>
            {type.map((e) => {
              return <option key={e.id}>{e.value}</option>;
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

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState('종류를 선택하세요');
  const [toggleStatus, setToggleStatus] = useState(false);
  const [storeId, setStoreId] = useState(false);

  const { id } = useParams();
  const { data } = useFoodDetail(id);
  useEffect(() => {
    if (data.data.message === '해당 가게를 찾을 수 없습니다.') {
      setStoreId(false);
    } else {
      setStoreId(data.data.data.storeId);
    }
  }, []);

  const [inputs, setInputs] = useState({
    img: null,
    name: '',
    time: '',
    address: '',
    phone: '',
    number: '',
    ask: '',
    newMenuName: '',
    newMenuPrice: '',
    newMenuContent: '',
    newMenuImg: null,
    tag: '',
  });

  const {
    img,
    name,
    time,
    address,
    phone,
    number,
    ask,
    newMenuName,
    newMenuPrice,
    newMenuContent,
    newMenuImg,
    tag,
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

  const postMenu = async () => {
    const res = await axios.post(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${id}/menus`,
      {
        name: newMenuName,
        price: newMenuPrice,
        content: newMenuContent,
        image: newMenuImg,
      },
    );
    return res;
  };

  const postInfo = async () => {
    const res = await axios.post(
      'http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/ask',
      {
        localId: id,
        storePhone: phone,
        storeNumber: number,
        storeStatus: toggleStatus ? 'BRAKE' : 'OPEN',
        storeName: name,
        storeContent: ask,
        // storeImage: img,
        storeType: dropDown,
        storeTime: time,
        storeWaitTime: '15분~30분',
        storeAddress: address,
        storePayment: '현금',
        storeTag: tag,
      },
    );
    console.log(res.data);
    return res;
  };
  console.log(storeId);
  const patchInfo = async () => {
    const res = await axios.patch(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${id}`,
      {
        localId: id,
        storePhone: phone,
        storeNumber: number,
        storeStatus: toggleStatus ? 'BRAKE' : 'OPEN',
        storeName: name,
        storeContent: ask,
        storeImage: img,
        storeType: dropDown,
        storeTime: time,
        storeWaittime: '15분~30분',
        storeAddress: address,
        storePayment: '현금',
        storeTag: tag,
      },
    );
    console.log(res.data);
    return res;
  };

  const deleteInfo = async () => {
    const res = await axios.delete(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${id}`,
    );
    return res;
  };

  const onSuccess = () => {
    alert('성공2');
  };

  const onError = () => {
    alert('실패2');
  };

  const onSettled = () => {
    alert('처리종료2');
  };

  const { mutate: postMutateMenu } = useMutation(postMenu, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: postMutateInfo } = useMutation(postInfo, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: patchMutateInfo } = useMutation(patchInfo, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: deleteMutateInfo } = useMutation(deleteInfo, {
    onSuccess,
    onError,
    onSettled,
  });

  const type = [
    { id: null, value: '종류를 선택하세요' },
    { id: 1, value: 'korean' },
    { id: 2, value: 'chinese' },
    { id: 3, value: 'western' },
    { id: 4, value: 'japanese' },
    { id: 5, value: 'snackbar' },
    { id: 6, value: 'cafe' },
    { id: 7, value: 'nightsnack' },
  ];

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Spinner color={COLOR.NAVY} size={100} />}>
        <Section>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('정말 본인 푸드트럭을 해체 하시겠습니까?')) {
                alert('푸드트럭을 해체 하였습니다.');
                deleteMutateInfo();
              }
            }}
          >
            가게 해체
          </button>
          <Title>가게 설정</Title>

          {storeId ? (
            <UpdateForm
              img={img}
              onChange={onChange}
              handleTypeChange={handleTypeChange}
              dropDown={dropDown}
              type={type}
              name={name}
              time={time}
              address={address}
              phone={phone}
              number={number}
              tag={tag}
              ask={ask}
            />
          ) : (
            <CreateFoodTruck>
              <MainImg>
                <div>
                  <img
                    alt="FoodTruckImg"
                    name="img"
                    value={img}
                    onChange={onChange}
                  />
                </div>

                <Dropdown>
                  <select
                    type="button"
                    onChange={handleTypeChange}
                    value={dropDown}
                  >
                    {type.map((e) => {
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

                <li>
                  <TypeInfo>
                    <input
                      placeholder="사업자번호 (필수)"
                      name="number"
                      value={number}
                      onChange={onChange}
                    />
                  </TypeInfo>
                </li>
              </ul>

              <DeleteTag>
                <input
                  placeholder="태그"
                  value={tag}
                  name="tag"
                  onChange={onChange}
                />

                <HashTagBtn
                  onClick={() => {
                    alert('하단 가게설정 완료를 눌러주세요');
                  }}
                >
                  해시태그 변경
                </HashTagBtn>
              </DeleteTag>

              <textarea
                placeholder="소개내용 (선택)"
                name="ask"
                value={ask}
                onChange={onChange}
              />
            </CreateFoodTruck>
          )}

          <OpenOrClose>
            <Toggle>
              <input
                type="checkbox"
                onClick={() => {
                  if (toggleStatus === false) {
                    if (
                      window.confirm('정말로 영업을 임시중단 하시겠습니까?') ===
                      true
                    ) {
                      setToggleStatus(true);
                    }
                  }
                  if (toggleStatus === true) {
                    setToggleStatus(!toggleStatus);
                  }
                }}
                checked={toggleStatus}
                id="toggle"
                hidden
              />
              <label htmlFor="toggle">
                <span />
              </label>
            </Toggle>
            <span>{toggleStatus ? '영업 임시중단' : '영업중'}</span>
          </OpenOrClose>

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
              <button
                type="button"
                onClick={() => {
                  postMutateMenu();
                }}
              >
                추가
              </button>
            </CreateFood>

            <UpdateFood>
              <Title>가게 메뉴 편집</Title>

              {storeId ? <FoodMenusList /> : null}

              <SettingDoneBtn>
                <button
                  type="button"
                  onClick={() => {
                    if (!storeId) {
                      postMutateInfo();
                    } else {
                      alert('이미 가게가 있습니다');
                    }
                  }}
                >
                  가게 등록
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (storeId) {
                      patchMutateInfo();
                    } else {
                      alert('가게를 먼저 만드셔야 합니다');
                    }
                  }}
                >
                  가게 업데이트
                </button>
              </SettingDoneBtn>
            </UpdateFood>
          </AddFood>
        </Section>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default FoodTruckSetting;
