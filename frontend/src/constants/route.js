const ROUTE = {
  HOME: { PATH: '/' },
  FOODLIST: {
    PATH: 'foodlist',
    FOODTRUCKS: { PATH: '/' },
    FOODDETAIL: { PATH: ':id' },
  },
  MYPAGE: {
    PATH: 'mypage',
    FOODTRUCKSETTING: { PATH: `trucksetting/:id` },
  },
  LOGIN: { PATH: 'login', NAME: '로그인' },
  LOGOUT: { PATH: 'logout', NAME: '로그아웃' },
  REGISTER: { PATH: 'register', NAME: '회원가입' },
  IDINQUIRY: { PATH: 'idinquiry', NAME: '아이디 찾기' },
  PWINQUIRY: { PATH: 'pwinquiry', NAME: '비밀번호 찾기' },
  BASKET: { PATH: 'basket', NAME: '장바구니' },
  ORDER: { PATH: 'order' },
  PWCHANGE: { PATH: 'pwchange' },
  NOTFOUND: { PATH: '*', NAME: '404' },
  REVIEW: { PATH: 'review' },
};

export { ROUTE };
