/* global IMP */

import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { atoms } from '../store';

const { IMP_KEY } = process.env;

IMP.init(IMP_KEY);

function usePay() {
  const orderList = useRecoilValue(atoms.orderList);
  const orderMenus = orderList.map((item) => ({
    menuId: item.menuId,
    count: item.count,
  }));

  const goPay = (orderRequest, paymentType) => {
    IMP.request_pay(
      {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'ORD20180131-0000015',
        name: '노르웨이 회전 의자',
        amount: 100,
        buyer_email: 'gildong@gmail.com',
        buyer_name: '홍길동',
        buyer_tel: '010-4242-4242',
        buyer_addr: '서울특별시 강남구 신사동',
        buyer_postcode: '01181',
      },

      async (rsp) => {
        const { imp_uid: impUid } = rsp;
        if (rsp.success) {
          await axios.post(`API/payment/verify/${impUid}`);
          await axios.post('API/order/orders', {
            orderMenus,
            orderRequest,
            paymentType,
          });
        } else {
          alert('결제 모듈을 사용할 수 없습니다.');
        }
      },
    );
  };

  return { orderList, goPay };
}

export { usePay };
