const { API_HOST } = process.env;

const KAKAO_API = {
  NAME: '카카오 로그인',
  CLIENT_ID: process.env.KAKAO_REST_API_KEY,
  REDIRECT_URI: 'https://yapick.netlify.app',
  HOST: 'https://kauth.kakao.com',
  PATH() {
    return `/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code`;
  },
  URI() {
    return `${this.HOST}${this.PATH()}`;
  },
};

const API_URI = {
  KAKAO_LOGIN: `${API_HOST}/login/oauth2/code/kakao`,
  KAKAO_LOGOUT: `${API_HOST}/kakao/logout`,
  LOGIN: `${API_HOST}/login`,
  REGISTER: `${API_HOST}/signup`,
  LOGOUT: `${API_HOST}/local/logout`,
  IDINQUIRY: `${API_HOST}/search/email`,
  PWINQUIRY: `${API_HOST}/search/password`,
  PWVERIFY: `${API_HOST}/search/password/verify`,
  MENU: `${API_HOST}/menu`,
  REVIEW: `${API_HOST}/review`,
  LOCAL_MYPAGE: `${API_HOST}/local/mypage`,
  KAKAO_MYPAGE: `${API_HOST}/kakao/mypage`,
};

export { KAKAO_API, API_URI };
