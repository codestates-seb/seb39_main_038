const ROUTE = {
  HOME: { PATH: '/' },
  FOODLIST: {
    PATH: 'foodlist',
    FOODTRUCKS: { PATH: '/' },
    FOODDETAIL: { PATH: ':id' },
  },
  LOGIN: { PATH: 'login', NAME: '로그인' },
  REGISTER: { PATH: 'register', NAME: '회원가입' },
  IDINQUIRY: { PATH: 'idinquiry', NAME: '아이디 찾기' },
  PWINQUIRY: { PATH: 'pwinquiry', NAME: '비밀번호 찾기' },
  BASKET: { PATH: 'basket', NAME: '장바구니' },
};

export { ROUTE };
