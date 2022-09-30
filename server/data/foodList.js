const { randomRange } = require("../utils/index.js");
/* https://www.yogiyo.co.kr/mobile/image/default_restaurant_logo.png */

export const data = Array.from({ length: 100 });

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
    store_id: i + 1,
    local_id: i + 1,
    store_status: true,
    store_name: name[randomRange(0, 4)],
    store_image:
      "https://www.yogiyo.co.kr/mobile/image/default_restaurant_logo.png",
    store_type: null,
    store_waittime: waittime[randomRange(0, 5)],
    store_tag: tag[randomRange(0, 4)],
  };
  data[i] = result;
}
