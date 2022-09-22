import { atom } from 'recoil';
import { MENU } from '../constants';

const atoms = {
  menuQuery: atom({ key: 'menu', default: MENU[0].query }),
};

export { atoms };
