import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { atoms } from '../../../store';
import {
  Section,
  MainBody,
  FoodTruckName,
  FoodTruckCapsulizedInfo,
  FoodTruckImg,
  CapsulizedInfo,
  Notice,
  MenuBar,
  ReviewTabBtn,
  InfoTabBtn,
  MenuTabBtn,
  MenuSection,
} from './styles';
import {
  DetailFoodList,
  DetailInfo,
  DetailReview,
  Receipt,
} from '../../../components';

function FoodDetail() {
  const [menuBar, setMenuBar] = useState('메뉴');
  const [foodTruckInfo, setFoodTruckInfo] = useRecoilState(atoms.foodTruckInfo);

  const getInfoList = async () => {
    const res = await axios.get(
      'http://ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com:8080/store/1',
    );
    return res.data;
  };

  const { isError, data, error } = useQuery(['getInfo'], getInfoList, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,

    onSuccess: () => {
      alert('정보 불러오기 성공');
    },

    onError: () => {
      alert('실패');
    },
  });

  if (isError) {
    return alert('정보 불러오기 실패', error);
  }

  return (
    <Section>
      {setFoodTruckInfo(data)}
      <MainBody>
        <FoodTruckName>
          <div>맘스터치</div>
        </FoodTruckName>
        <FoodTruckCapsulizedInfo>
          <FoodTruckImg>
            <img alt="FoodTruckImg" />
          </FoodTruckImg>

          <CapsulizedInfo>
            <ul>
              <li>{foodTruckInfo.total_grade}</li>
              <li>{foodTruckInfo.store_waittime}</li>
              <li>{foodTruckInfo.store_tag}</li>
            </ul>
          </CapsulizedInfo>
        </FoodTruckCapsulizedInfo>
        <Notice className="Notice">
          <div>사장님의 알림 {foodTruckInfo.store_content}</div>
        </Notice>
        <MenuSection>
          <MenuBar>
            <MenuTabBtn
              menu={menuBar}
              type="button"
              onClick={() => {
                setMenuBar('메뉴');
              }}
            >
              메뉴 {foodTruckInfo.total_menu}
            </MenuTabBtn>
            <ReviewTabBtn
              menu={menuBar}
              type="button"
              onClick={() => {
                setMenuBar('리뷰');
              }}
            >
              클린리뷰 {foodTruckInfo.total_comment}
            </ReviewTabBtn>
            <InfoTabBtn
              menu={menuBar}
              type="button"
              onClick={() => {
                setMenuBar('정보');
              }}
            >
              정보
            </InfoTabBtn>
          </MenuBar>
          {menuBar === '메뉴' ? <DetailFoodList /> : null}
          {menuBar === '리뷰' ? <DetailReview /> : null}
          {menuBar === '정보' ? <DetailInfo /> : null}
        </MenuSection>
      </MainBody>
      <Receipt />
    </Section>
  );
}

export default FoodDetail;
