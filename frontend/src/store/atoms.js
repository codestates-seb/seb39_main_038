import axios from 'axios';

import { atom, selector } from 'recoil';
import { storge } from './storge';
import { MENU } from '../constants';

const sessionStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const data = storge.getData(key);
    if (data) setSelf(data);
    onSet((newData) => {
      storge.setData(key, newData);
    });
  };

const atoms = {
  isLogin: atom({
    key: 'isLogin',
    default: { state: false, type: null },
    effects: [sessionStorageEffect('isLogin')],
  }),

  menuQuery: atom({ key: 'menu', default: MENU[0].query }),
  menuTab: atom({ key: 'menuTab', default: '메뉴' }),
  modal: atom({
    key: 'modal',
    default: { food: false, order: false, email: false },
  }),
  tagName: atom({ key: 'tagName', default: '' }),
};

const selectors = {
  getCart: selector({
    key: 'getCart',
    get: async () => {
      const res = await axios.get('http://localhost:8080/order/1');
      return res.data;
    },
  }),
  getMenu: selector({
    key: 'getMenu',
    get: async () => {
      const res = await axios.get('/store/1');
      if (res.menu) {
        return res.menu;
      }
      return alert('음식을 불러오지 못했습니다.');
    },
  }),
};

export { atoms, selectors };
