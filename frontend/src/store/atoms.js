import { atom } from 'recoil';
import { MENU } from '../constants';

const atoms = {
  menuQuery: atom({ key: 'menu', default: MENU[0].query }),
  modal: atom({
    key: 'modal',
    default: { food: false, order: false, email: false },
  }),
};

export { atoms };
