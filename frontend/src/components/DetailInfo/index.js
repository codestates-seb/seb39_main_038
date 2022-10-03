import React from 'react';
import { useRecoilValue } from 'recoil';
import { atoms } from '../../store';
import {
  TruckInfoBody,
  TruckInfoTitle,
  TruckInfoContent,
  TruckInfoContentKey,
  TruckInfoContentValue,
} from './styles';

function DetailInfo() {
  const foodTruckInfo = useRecoilValue(atoms.foodTruckInfo);

  return (
    <TruckInfoBody>
      <TruckInfoTitle>사장님 알림</TruckInfoTitle>

      <TruckInfoContent>{foodTruckInfo.content}</TruckInfoContent>

      <TruckInfoTitle>업체정보</TruckInfoTitle>
      {console.log(foodTruckInfo)}
      <TruckInfoContent>
        <TruckInfoContentKey>
          영업시간:{' '}
          <TruckInfoContentValue>{foodTruckInfo.time}</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          전화번호:{' '}
          <TruckInfoContentValue>{foodTruckInfo.phone}</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          주소:{' '}
          <TruckInfoContentValue>{foodTruckInfo.address}</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>결제정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          결제수단:{' '}
          <TruckInfoContentValue>{foodTruckInfo.payment}</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>사업자정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          상호명:{' '}
          <TruckInfoContentValue>{foodTruckInfo.name}</TruckInfoContentValue>
        </TruckInfoContentKey>
        <TruckInfoContentKey>
          사업자번호:{' '}
          <TruckInfoContentValue>{foodTruckInfo.number}</TruckInfoContentValue>
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
