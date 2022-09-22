import axios from 'axios';
import { atom, selector } from 'recoil';

const menuTab = atom({
  key: 'menuTab',
  default: '메뉴',
});

const getMenu = selector({
  key: 'getMenu',
  get: async () => {
    const response = await axios.get('http://localhost:8080/menu');
    return response.data;
  },
});

export { menuTab, getMenu };
