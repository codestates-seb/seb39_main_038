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

  ORDER: {
    PAYMENT: '결제하기',
    REQUEST: '주문시 요청사항',
    MAX_LENGTH: '최대 100자까지 입력 가능합니다.',
    METHOD_OF_PAYMENT: '결제수단 선택',
    CASH_PAYMENT_TOOLTIP:
      '현금결제를 원하시는 경우 직접 푸드트럭 앞에서 현금을 지불할 수 있어요!',
    CARD_PAYMENT: '신용카드',
    CASH_PAYMENT: '현금',
    METHOD_OF_DISCOUNT: '할인방법 선택',
    APPLY: '적용',
    MILEAGE: (text = 0) => `마일리지: ${text} 원`,
    LENGHT_CHECK: (text = 100) => `100 / ${text}`,
  },
};

export { TEXT };
