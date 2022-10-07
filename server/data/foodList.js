const { randomRange } = require("../utils/index.js");
/* https://www.yogiyo.co.kr/mobile/image/default_restaurant_logo.png */

const data = Array.from({ length: 100 });

const waittime = [
  "10분 이하",
  "10분~20분",
  "20분~30분",
  "30분~40분",
  "40분 이상",
];

const menus = [
  { name: "양식 푸드트럭", type: "western" },
  { name: "한식 푸드트럭", type: "korean" },
  { name: "중식 푸드트럭", type: "chinese" },
  { name: "일식 푸드트럭", type: "japanese" },
  { name: "분식 푸드트럭", type: "snackbar" },
  { name: "야식 푸드트럭", type: "nightsnack" },
  { name: "카페 푸드트럭", type: "cafe" },
];

const tag = ["카드 환영", "시원한 맥주", "얼음물 무료", "맛집"];

for (let i = 0; i < data.length; i++) {
  const menu = menus[randomRange(0, 7)];
  const result = {
    storeId: i + 1,
    storePhone: "010-2222-2222",
    storeNumber: "010-3333-3333",
    storeStatus: true,
    storeName: menu.name,
    storeContent: "가게 정보",
    storeImage:
      "https://www.yogiyo.co.kr/mobile/image/default_restaurant_logo.png",
    storeType: menu.type,
    storeTime: "오후 10시까지",
    storeWaittime: waittime[randomRange(0, 5)],
    storeAddress: "가게 주소",
    storeTag: tag[randomRange(0, 4)],
    totalGrade: 4,
    totalReview: 100,
    totalComment: 100,
  };
  data[i] = result;
}

module.exports = { data };
