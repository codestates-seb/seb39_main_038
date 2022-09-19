const KAKAO_API = {
  NAME: '카카오 로그인',
  CLIENT_ID: process.env.KAKAO_REST_API_KEY,
  REDIRECT_URI: 'http://127.0.0.1:3000',
  HOST: 'https://kauth.kakao.com',
  PATH() {
    return `/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=code`;
  },
  URI() {
    return `${this.HOST}${this.PATH()}`;
  },
};

export { KAKAO_API };
