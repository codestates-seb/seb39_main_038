import React from 'react';
import {
  TruckInfoBody,
  TruckInfoTitle,
  TruckInfoContent,
  TruckInfoContentKey,
  TruckInfoContentValue,
} from './styles';

function DetailInfo() {
  return (
    <TruckInfoBody>
      <TruckInfoTitle>사장님 알림</TruckInfoTitle>

      <TruckInfoContent>
        상단 찜 하트 꾸욱 눌러주세요. 리뷰 서비스 1당면추가 2음료
      </TruckInfoContent>

      <TruckInfoTitle>업체정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          영업시간: <TruckInfoContentValue>10:35 - 22:00</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          전화번호: <TruckInfoContentValue>010-1234-5678</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          주소:{' '}
          <TruckInfoContentValue>
            서울특별시 강동구 길동 377-3 오륜빌딩 1층 104호(길동, 오륜빌딩)
          </TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>결제정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          결제수단: <TruckInfoContentValue>카드, 현금</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>사업자정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          상호명: <TruckInfoContentValue>맘스터치</TruckInfoContentValue>
        </TruckInfoContentKey>
        <TruckInfoContentKey>
          사업자번호: <TruckInfoContentValue>7360701994</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>원산지정보</TruckInfoTitle>

      <TruckInfoContent>
        돼지고기(국내산),김치(국내산),쌀(국내산),고춧가루(국내산),바지락(국내산),새우(베트남),꽃게(중국산)두부(콩:미국산,중국산,캐나다산),콩나물(콩:중국산)
      </TruckInfoContent>
    </TruckInfoBody>
  );
}

export { DetailInfo };
