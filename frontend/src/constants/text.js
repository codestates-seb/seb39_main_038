const TEXT = {
  CONSUMERLOGIN: {
    KAKAO_LOGIN: '카카오 로그인',
    GITHUB_LOGIN: '깃허브 로그인',
    FACEBOOK_LOGIN: '페이스북 로그인',
    GOOGLE_LOGIN: '구글 로그인',
  },

  LOGINNAV: {
    CONSUMER_LOGIN: '일반 회원',
    PROVIDER_LOGIN: '사업자 회원',
  },

  PWINQUIRY: {
    POST_EMAIL: '입력하신 이메일 주소로 비밀번호 재설정 메일이 발송됩니다.',
    IMPOSSIBLE: '카카오 소셜 회원은 비밀번호 찾기가 불가능합니다.',
    OPEN_MODAL: '모달창 열기',
  },

  PWCHANGE: {
    PASSWORD_FINDING_COMPLETE: '비밀번호 변경 완료',
  },

  NOTFOUND: {
    PAGE_NOTFOUND: '찾을 수 없는 페이지 입니다.',
    WRONG_PATH: '잘못된 경로를 사용하셨어요 :)',
    GO_HOME: '홈으로 이동',
  },

  FOODDETAIL: {
    STAR: '별점',
    WAIT_TIME: '대기시간',
    TAG: '태그',
    NOTICE: '사장님알림',
    INFO: '정보',
    MENU: (text = '') => `메뉴 ${text}`,
    CLEAN_REVIWE: (text = '') => `클린리뷰 ${text}`,
  },
};

export { TEXT };
