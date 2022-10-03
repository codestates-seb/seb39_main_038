import { atom } from 'recoil';
import { storge } from '../utils/storge';
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
  modal: atom({
    key: 'modal',
    default: { food: false, order: false, email: false },
  }),

  menuOrder: atom({
    key: 'menuOrder',
    default: [{ name: '', price: null, id: null, count: null }],
  }),

  orderList: atom({
    key: 'orderList',
    default: [],
    effects: [sessionStorageEffect('orderList')],
  }),
};

export { atoms };
