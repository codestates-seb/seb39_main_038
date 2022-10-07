import React from 'react';
import { useParams } from 'react-router-dom';
import { useFoodDetail } from '../../hooks';
import {
  TruckInfoBody,
  TruckInfoTitle,
  TruckInfoContent,
  TruckInfoContentKey,
  TruckInfoContentValue,
} from './styles';

function DetailInfo() {
  const { id } = useParams();
  const { data } = useFoodDetail(id);

  const {
    storeContent,
    storeTime,
    storePhone,
    storeAddress,
    storePayment,
    storeName,
    storeNumber,
  } = data.data.data;

  return (
    <TruckInfoBody>
      <TruckInfoTitle>사장님 알림</TruckInfoTitle>

      <TruckInfoContent>{storeContent}</TruckInfoContent>

      <TruckInfoTitle>업체정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          영업시간: <TruckInfoContentValue>{storeTime}</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          전화번호: <TruckInfoContentValue>{storePhone}</TruckInfoContentValue>
        </TruckInfoContentKey>

        <TruckInfoContentKey>
          주소: <TruckInfoContentValue>{storeAddress}</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>결제정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          결제수단:{' '}
          <TruckInfoContentValue>{storePayment}</TruckInfoContentValue>
        </TruckInfoContentKey>
      </TruckInfoContent>

      <TruckInfoTitle>사업자정보</TruckInfoTitle>

      <TruckInfoContent>
        <TruckInfoContentKey>
          상호명: <TruckInfoContentValue>{storeName}</TruckInfoContentValue>
        </TruckInfoContentKey>
        <TruckInfoContentKey>
          사업자번호:{' '}
          <TruckInfoContentValue>{storeNumber}</TruckInfoContentValue>
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
