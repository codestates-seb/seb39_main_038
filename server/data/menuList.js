const foods = ["치킨", "햄버거", "피자", "라면", "초밥"];

const createFoods = (id) => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      menuId: i,
      name: `${foods[i]} ${id}`,
      price: 10000,
      img: null,
      content: "음식 설명",
    });
  }
  return data;
};

module.exports = { createFoods };
