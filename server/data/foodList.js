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

const name = [
  "중식 푸드트럭",
  "일식 푸드트럭",
  "한식 푸드트럭",
  "양식 푸드트럭",
];

const tag = ["카드 환영", "시원한 맥주", "얼음물 무료", "맛집"];

for (let i = 0; i < data.length; i++) {
  const result = {
    storeId: i + 1,
    localId: i + 1,
    storeStatus: true,
    storeName: name[randomRange(0, 4)],
    storeImage:
      "https://www.yogiyo.co.kr/mobile/image/default_restaurant_logo.png",
    storeType: null,
    storeWaittime: waittime[randomRange(0, 5)],
    storeTag: tag[randomRange(0, 4)],
  };
  data[i] = result;
}

module.exports = { data };
