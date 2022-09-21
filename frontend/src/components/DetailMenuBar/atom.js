import { atom } from 'recoil';

const menuTab = atom({
  key: 'menuTab',
  default: '리뷰',
});

export { menuTab };
