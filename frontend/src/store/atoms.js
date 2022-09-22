// import axios from 'axios';
import { atom, selector } from 'recoil';
import { MENU } from '../constants';

const atoms = {
  menuQuery: atom({ key: 'menu', default: MENU[0].query }),
  menuTab: atom({ key: 'menuTab', default: '메뉴' }),
};

const selectors = {
  getMenu: selector({
    key: 'getMenu',
    get: async () => {
      // const response = await axios.get('http://localhost:8080/menu');
      // return response.data;
    },
  }),
};

export { atoms, selectors };
