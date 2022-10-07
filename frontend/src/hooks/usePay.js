/* global IMP */

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { atoms } from '../store';
import { randomRange, dateFormat } from '../utils';
import { API_URI } from '../constants';

const { IMP_KEY } = process.env;

IMP.init(IMP_KEY);

function usePay(id) {
  const queryClinet = useQueryClient();
  const orderList = useRecoilValue(atoms.orderList);
  const orderMenus = orderList.map((item) => ({
    menuId: item.menuId,
    count: item.count,
  }));

  const data = queryClinet.getQueryData(['foodDetail', id]);

  const payWithCash = async (orderRequest, paymentType) => {
    await axios.post(`${API_URI.ORDER}`, {
      orderMenus,
      orderRequest,
      paymentType,
    });
  };

  const payWithCard = (orderRequest, paymentType) => {
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `ORD${dateFormat(new Date(), '')}-${randomRange(
          0,
          100000,
        )}`,
        name: data?.data.data.storeName,
        amount: 100,
        buyer_tel: data?.data.data.storePhone,
        buyer_addr: data?.data.data.storeAddress,
        buyer_postcode: data?.data.data.storeId,
      },

      async (rsp) => {
        const { imp_uid: impUid } = rsp;
        if (rsp.success) {
          await axios.post(`${API_URI.PAYMENT}/${impUid}`);
          await payWithCash(orderRequest, paymentType);
        } else {
          alert('결제 모듈을 사용할 수 없습니다.');
        }
      },
    );
  };

  return { payWithCard, payWithCash };
}

export { usePay };
