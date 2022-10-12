import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
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
  SettingDoneBtn,
  Toggle,
  OpenOrClose,
  Avatar,
} from './styles';
import { Spinner, ErrorBoundary } from '../../components';
import { COLOR } from '../../constants';
import MenuList from './MenuList';
import UpdateForm from './UpdateForm';
import { withAuth } from '../../components/Hoc';
import { useSetting } from '../../hooks/useSetting';
import { atoms } from '../../store';

function FoodTruckSetting() {
  const [dropDown, setDropDown] = useState('korean');
  const [toggleStatus, setToggleStatus] = useState(false);
  const [img, setImg] = useState('');
  const [newMenuImg, setNewMenuImg] = useState('');
  const [storeId, setStoreId] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeImage, setStoreImage] = useState('');
  const [storeContent, setStoreContent] = useState('');
  const [storeTag, setStoreTag] = useState('');
  const [storeTime, setStoreTime] = useState('');
  const [storePhone, setStorePhone] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');

  const { postMutateMenu, postMutateInfo, patchMutateInfo, deleteMutateInfo } =
    useSetting();

  const [loginInfo, setLoginInfo] = useRecoilState(atoms.loginInfo);

  const { id } = useParams();

  useEffect(() => {
    if (loginInfo.storeId === null) {
      setLoginInfo({ storeId: false, localId: Number(id) });
    } else {
      setStoreId(loginInfo.storeId);
    }
  }, [loginInfo]);

  const [inputs, setInputs] = useState({
    name: '',
    time: '',
    address: '',
    phone: '',
    number: '',
    ask: '',
    newMenuName: '',
    newMenuPrice: '',
    newMenuContent: '',
    tag: '',
  });

  const {
    name,
    time,
    address,
    phone,
    number,
    ask,
    newMenuName,
    newMenuPrice,
    newMenuContent,
    tag,
  } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeNewImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImg = reader.result;
      setNewMenuImg(resultImg);
    };
  };

  const onChangeImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImg = reader.result;
      setImg(resultImg);
    };
  };

  const handleTypeChange = (e) => {
    setDropDown(e.target.value);
  };

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
                deleteMutateInfo({ storeId });
                alert('푸드트럭을 폐업 하였습니다.');
                setLoginInfo({ storeId: null, localId: Number(id) });
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
              dropDown={dropDown}
              name={name}
              time={time}
              address={address}
              phone={phone}
              number={number}
              tag={tag}
              ask={ask}
              categories={categories}
              storeId={storeId}
              onChangeImg={onChangeImg}
              setStoreName={setStoreName}
              setStoreImage={setStoreImage}
              setStoreContent={setStoreContent}
              setStoreTag={setStoreTag}
              setStoreTime={setStoreTime}
              setStorePhone={setStorePhone}
              setStoreAddress={setStoreAddress}
              setStoreNumber={setStoreNumber}
            />
          ) : (
            <CreateFoodTruck>
              <MainImg>
                <Avatar>
                  <div>
                    <img src={img} alt="푸드트럭 이미지 입니다" />
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
                  <select
                    type="button"
                    onChange={handleTypeChange}
                    value={dropDown}
                  >
                    {categories.map((res, index) => {
                      return (
                        <option
                          key={res.type}
                          id={`${index}`}
                          value={res.value}
                        >
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
                    alert('변경 완료');
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
                    alert('영업을 임시로 중단하였습니다');
                    setToggleStatus(true);
                  }

                  if (toggleStatus === true) {
                    setToggleStatus(false);
                  }
                }}
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
              <Avatar>
                <div>
                  <img alt="새로운 메뉴 이미지" src={newMenuImg} />
                  <label htmlFor="file1">수정</label>
                  <input
                    type="file"
                    id="file1"
                    onChange={onChangeNewImg}
                    accept="image/*"
                  />
                </div>
              </Avatar>
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
                  if (storeId) {
                    if (
                      newMenuImg &&
                      newMenuName &&
                      newMenuContent &&
                      newMenuPrice
                    ) {
                      alert('메뉴를 성공적으로 추가했습니다');
                      const value = {
                        name: newMenuName,
                        price: newMenuPrice,
                        content: newMenuContent,
                        image: newMenuImg,
                      };
                      postMutateMenu({ storeId, value });
                    } else {
                      alert('모든 정보를 입력해 주세요');
                    }
                  } else {
                    alert('가게를 먼저 등록해 주세요');
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
                        dropDown &&
                        time &&
                        address &&
                        img
                      ) {
                        alert('가게를 성공적으로 등록했습니다');
                        alert('로그아웃 후 로그인하시면 이용 가능하십니다');
                        const value = {
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
                        };
                        postMutateInfo({ value });
                      } else {
                        alert('소개내용 제외 모두 입력 하셔야 합니다');
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
                      if (img) {
                        alert(
                          '성공적으로 가게를 수정하였습니다. 새로고침 해주세요',
                        );
                        const value = {
                          localId: id,
                          storePhone: phone || storePhone,
                          storeNumber: number || storeNumber,
                          storeStatus: toggleStatus ? 'BRAKE' : 'OPEN',
                          storeName: name || storeName,
                          storeContent: ask || storeContent,
                          storeImage: img || storeImage,
                          storeType: dropDown,
                          storeTime: time || storeTime,
                          storeWaittime: '15분~30분',
                          storeAddress: address || storeAddress,
                          storePayment: '현금',
                          storeTag: tag || storeTag,
                        };
                        patchMutateInfo({ storeId, value });
                      } else {
                        alert(
                          '업데이트 서비스상 이미지는 한번더 넣으셔야 합니다',
                        );
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

export default withAuth(FoodTruckSetting);
