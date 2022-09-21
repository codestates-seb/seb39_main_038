import { atom } from 'recoil';

const menuTab = atom({
  key: 'menuTab',
  default: '정보',
});

export { menuTab };
