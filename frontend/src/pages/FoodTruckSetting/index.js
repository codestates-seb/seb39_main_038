import axios from 'axios';
import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { Spinner } from '../../components';

function FoodMenusList(
  menuImg,
  menuName,
  menuContent,
  onChange,
  menuPrice,
  deleteMutateMenu,
) {
  const getMenu = async () => {
    const res = await axios.get('http://localhost:8080/store');
    // session storage 에 담긴 사장님 ID 로 FoodTruck 중 일치하는걸 찾아 뿌리는 방식?
    return res.data.menus;
  };

  const { isError, isLoading, data } = useQuery(['menus'], getMenu, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    retryDelay: 3000,

    onSuccess: () => {
      alert('성공1');
    },
    onError: () => {
      alert('실패1');
    },
    onSettled: () => {
      alert('종료1');
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return alert('음식들을 불러오지 못했습니다.');
  }

  return data.map((res) => (
    <UpdateInput key={res.id}>
      <img
        alt="FoodImg"
        name="menuImg"
        value={menuImg}
        onChange={onChange}
        src={res.img}
      />

      <TypeInfo>
        <input
          placeholder={res.name}
          name="menuName"
          value={menuName}
          onChange={onChange}
        />
        {/* {console.log(menuName)} */}
        <input
          placeholder={res.info}
          name="menuContent"
          value={menuContent}
          onChange={onChange}
        />

        <input
          placeholder={res.price}
          name="menuPrice"
          value={menuPrice}
          onChange={onChange}
        />
      </TypeInfo>

      <button type="button">수정</button>
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

function HashTag({ deleteMutateTag, onKeyPress }) {
  const getHashTag = async () => {
    const res = await axios.get('http://localhost:8080/foodtruck');
    return res.data;
  };

  const { isError, isLoading, data } = useQuery(['hashTag'], getHashTag, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    onSuccess: () => {
      alert('태그성공');
    },
    onError: () => {
      alert('태그실패');
    },
    onSettled: () => {
      alert('종료');
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return alert('태그를 불러오지 못했습니다.');
  }

  return data.map((res) => (
    <Hash>
      <input value={res.store_tag} onKeyPress={onKeyPress} />
      <button
        type="button"
        onClick={() => {
          deleteMutateTag();
        }}
      >
        X
      </button>
    </Hash>
  ));
}

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState('종류를 선택하세요');
  const [inputs, setInputs] = useState({
    img: '',
    name: '',
    time: '',
    address: '',
    phone: '',
    number: '',
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
    number,
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

  const postMenu = async () => {
    const res = await axios.post('http://localhost:8080/store', {
      menus: [
        {
          name: newMenuName,
          price: newMenuPrice,
          content: newMenuContent,
          image: newMenuImg,
        },
      ],
    });
    return res;
  };

  const postHashTag = async () => {
    const res = await axios.post('http://localhost:8080/store', {
      foodtruck: [{ store_tag: tag }],
    });
    return res;
  };

  const postInfo = async () => {
    const res = await axios.post('http://localhost:8080/store', {
      foodtruck: [
        {
          store_phone: phone,
          store_number: number,
          store_status: '토글 or 버튼으로 상태바',
          store_name: name,
          store_content: ask,
          store_image: img,
          sotre_tpye: dropDown,
        },
      ],
    });
    return res;
  };

  const deleteTag = async () => {
    const res = await axios.delete(`/tag/1`);
    return res;
  };

  const deleteMenu = async () => {
    const res = await axios.delete(`/menus/1`);
    return res;
  };

  const patchTag = async () => {
    const res = await axios.patch('/tag/1');
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

  const { mutate: postMutateHashTag } = useMutation(postHashTag, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: postMutateInfo } = useMutation(postInfo, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: deleteMutateTag } = useMutation(deleteTag, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: deleteMutateMenu } = useMutation(deleteMenu, {
    onSuccess,
    onError,
    onSettled,
  });

  const { mutate: patchMutateTag } = useMutation(patchTag, {
    onSuccess,
    onError,
    onSettled,
  });

  const storeType = [
    { id: null, value: '종류를 선택하세요' },
    { id: 1, value: '한식' },
    { id: 2, value: '중식' },
    { id: 3, value: '양식' },
    { id: 4, value: '일식' },
    { id: 5, value: '분식' },
    { id: 6, value: '디저트' },
  ];

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      patchMutateTag();
    }
  };

  return (
    <Section>
      <Title>가게 설정</Title>

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
          <input value={tag} name="tag" onChange={onChange} />

          <HashTagBtn
            onClick={() => {
              postMutateHashTag();
            }}
          >
            해시태그 추가 +
          </HashTagBtn>

          <HashTag onKeyPress={onKeyPress} deleteMutateTag={deleteMutateTag} />
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

          <FoodMenusList
            menuImg={menuImg}
            menuName={menuName}
            menuContent={menuContent}
            onChange={onChange}
            menuPrice={menuPrice}
            deleteMutateMenu={deleteMutateMenu}
          />

          <SettingDoneBtn>
            <button
              type="button"
              onClick={() => {
                postMutateInfo();
              }}
            >
              가게설정 완료
            </button>
          </SettingDoneBtn>
        </UpdateFood>
      </AddFood>
    </Section>
  );
}

export default FoodTruckSetting;
