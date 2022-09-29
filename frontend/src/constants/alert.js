const ALERT = {
  CLIENT: {
    500: { MESSAGE: '서버와 연결을 확인해주세요.' },
    400: { MESSAGE: '현재 서비스 준비중입니다. !!' },
    401: { MESSAGE: '모든 입력창의 값을 입력해주세요.', STATUS: 401 },
    402: { MESSAGE: '비밀번호는 10 자 이상입니다.', STATUS: 402 },
    403: { MESSAGE: '이름은 한글만 가능합니다.', STATUS: 403 },
    404: {
      MESSAGE:
        '비밀번호는 10 자 이상이며 하나 이상의 영문, 숫자, 특수문자를 포함하여야 합니다.',
      STATUS: 404,
    },
    405: {
      MESSAGE: '입력하신 비밀번호와 비밀번호 확인 문자가 일치하지 않습니다.',
      STATUS: 405,
    },
    406: {
      MESSAGE: '휴대폰 전화번호 형식을 확인해주세요.',
      STATUS: 406,
    },
  },
};

export { ALERT };
