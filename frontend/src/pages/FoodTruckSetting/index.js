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

function FoodMenusList({ storeId, props }) {
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
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${storeId}/menus/${menuId}`,
    );
    return res;
  };

  const patchMenu = async () => {
    const res = await axios.patch(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${storeId}/menus/${menuId}`,
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

  const formHandler = (e) => {
    e.preventDefault();
    // e.target.reset();
  };

  return (
    <UpdateInput>
      <img
        alt="FoodImage"
        name="menuImg"
        value={menuImg}
        onChange={onChange}
        src={props.image}
      />

      <TypeInfo onSubmit={formHandler}>
        <input
          placeholder={props.name}
          name="menuName"
          value={menuName}
          onChange={onChange}
        />

        <input
          placeholder={props.content}
          name="menuContent"
          value={menuContent}
          onChange={onChange}
        />

        <input
          placeholder={props.price}
          name="menuPrice"
          value={menuPrice}
          onChange={onChange}
        />
      </TypeInfo>

      <button
        type="button"
        value={props.menuId}
        onClick={(e) => {
          setMenuId(e.value);
          if (
            menuPrice &&
            menuContent &&
            menuName
            //  && menuImg
          ) {
            patchMutateMenu();
          } else {
            alert('모든 정보를 입력해 주세요');
          }
        }}
      >
        수정
      </button>
      <button
        type="button"
        onClick={(e) => {
          setMenuId(e.value);
          alert('음식 제거 완료');
          deleteMutateMenu();
        }}
      >
        제거
      </button>
    </UpdateInput>
  );
}

function MenuList({ storeId }) {
  const { data } = useDetailFoodList(storeId);
  console.log(data.data.menus);
  const createList = () => {
    return data.data.menus.map((props) => (
      <FoodMenusList key={props.menuId} props={props} storeId={storeId} />
    ));
  };
  return createList;
}

function UpdateForm({
  img,
  onChange,
  handleTypeChange,
  name,
  time,
  address,
  phone,
  number,
  tag,
  ask,
  categories,
}) {
  const { id } = useParams();
  const { data } = useFoodDetail(id);

  const [dropDown] = useState('한식');

  const {
    storeName,
    storeImage,
    storeContent,
    storeTag,
    storeTime,
    storePhone,
    storeAddress,
    storeNumber,
    storeType,
  } = data.data.data;

  // const renderType = () => {
  //   useEffect(() => {
  //     setDropDown(storeType);
  //   });
  // };

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
            {categories.map((res, index) => {
              if (res.type === storeType) {
                // true시 dropDown을 바꾸기 위해 setDropDown(res.type) 사용
                return (
                  <option id={`${index}`} value={res.value}>
                    {res.type}
                  </option>
                );
              }
              return (
                <option id={`${index}`} value={res.value}>
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

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState(null);
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
        storeImage: img,
        storeType: dropDown,
        storeTime: time,
        storeWaitTime: '15분~30분',
        storeAddress: address,
        storePayment: '현금',
        storeTag: tag,
      },
    );
    console.log(res.data.message);
    if (res.data.message) {
      alert(res.data.message);
    }

    return res;
  };
  console.log(storeId);
  const patchInfo = async () => {
    const res = await axios.patch(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${storeId}`,
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
    console.log(res.data.message);
    if (res.data.message) {
      alert(res.data.message);
    }
    return res;
  };

  const deleteInfo = async () => {
    const res = await axios.delete(
      `http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/${storeId}`,
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

  const categories = [
    { value: 'korean', type: '한식' },
    { value: 'chinese', type: '중식' },
    { value: 'western', type: '양식' },
    { value: 'japanese', type: '일식' },
    { value: 'snackbar', type: '분식' },
    { value: 'cafe', type: '디저트' },
    { value: 'nightsnack', type: '야식' },
  ];

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Spinner color={COLOR.NAVY} size={100} />}>
        <Section>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('정말 본인 푸드트럭을 폐업 하시겠습니까?')) {
                alert('푸드트럭을 폐업 하였습니다.');
                deleteMutateInfo();
              }
            }}
          >
            가게 폐업
          </button>
          <Title>가게 설정</Title>

          {storeId ? (
            <UpdateForm
              img={img}
              onChange={onChange}
              handleTypeChange={handleTypeChange}
              name={name}
              time={time}
              address={address}
              phone={phone}
              number={number}
              tag={tag}
              ask={ask}
              categories={categories}
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
                    {categories.map((res, index) => {
                      return (
                        <option id={`${index}`} value={res.value}>
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
                  if (
                    // newMenuImg &&
                    newMenuName &&
                    newMenuContent &&
                    newMenuPrice
                  ) {
                    postMutateMenu();
                  } else {
                    alert('모든 정보를 입력해 주세요');
                  }
                }}
              >
                추가
              </button>
            </CreateFood>

            <UpdateFood>
              <Title>가게 메뉴 편집</Title>

              {storeId ? <MenuList storeId={storeId} /> : null}

              <SettingDoneBtn>
                <button
                  type="button"
                  onClick={() => {
                    if (!storeId) {
                      if (
                        phone &&
                        number &&
                        name &&
                        ask &&
                        dropDown &&
                        time &&
                        address
                      ) {
                        postMutateInfo();
                      } else {
                        alert('태그를 제외한 모두 입력 하셔야 합니다');
                      }
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
                      if (
                        phone &&
                        number &&
                        name &&
                        ask &&
                        dropDown &&
                        time &&
                        address
                      ) {
                        patchMutateInfo();
                      } else {
                        alert('태그를 제외한 모두 입력 하셔야 합니다');
                      }
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
