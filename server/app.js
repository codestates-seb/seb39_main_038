/* /store?page={page}&size={size}&type={chinese} */
const express = require("express");
const cors = require("cors");
const { foodListData, foodReviewData, createFoods } = require("./data");

const app = express();
const PORT = 80;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/store", (req, res) => {
  const { page, size, type } = req.query;

  const pageInfo = (data) => ({
    page: Number(page),
    size: Number(page),
    totalElements: data.length,
    totalPages: parseInt(data.length / size, 10) + 1,
  });

  if (type === "all")
    return res.status(200).json({
      data: foodListData.slice((page - 1) * size, page * size),
      pageInfo: pageInfo(foodListData),
    });

  const filterData = foodListData.filter((item) => type === item.storeType);
  return res.status(200).json({
    data: filterData.slice((page - 1) * size, page * size),
    pageInfo: pageInfo(filterData),
  });
});

app.get("/store/:id", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ data: foodListData[id] });
});

app.get("/store/:id/menus", (req, res) => {
  const { id } = req.params;
  return res.status(200).json({ storeId: Number(id), menus: createFoods(id) });
});

app.post("/local/mypage", (req, res) => {
  return res.status(200).json({
    data: {
      avatar: null,
      email: "abs@naver.com",
      name: "홍길동",
      phone: "010-2222-2222",
      store: {
        storeId: 1,
      },
    },
  });
});

app.post("/kakao/mypage", (req, res) => {
  return res.status(200).json({
    data: { email: "abs@naver.com", nickname: "홍길동", profileImage: null },
  });
});

app.get("/order/orders", (req, res) => {
  const orders = {
    orders: [
      {
        orderId: 1,
        orderMenu: [
          {
            menuId: 1,
            name: "치킨 1",
            price: 5000,
            count: 1,
            storeId: 1,
            storeName: "양식 푸드트럭 1",
          },
          {
            menuId: 2,
            name: "피자 1",
            price: 5000,
            count: 1,
            storeId: 1,
            storeName: "양식 푸드트럭 1",
          },
        ],
        createdAt: new Date(),
        totalCount: 2,
        totalPrice: 10000,
        paymentType: "",
        orderRequest: "",
      },
      {
        orderId: 2,
        orderMenu: [
          {
            menuId: 1,
            name: "치킨 2",
            price: 5000,
            count: 1,
            storeId: 2,
            storeName: "양식 푸드트럭 2",
          },
          {
            menuId: 2,
            name: "피자 2",
            price: 5000,
            count: 1,
            storeId: 2,
            storeName: "양식 푸드트럭 2",
          },
        ],
        createdAt: new Date(),
        totalCount: 2,
        totalPrice: 10000,
        paymentType: "",
        orderRequest: "",
      },
    ],
    totalOrder: 2,
  };
  return res.status(200).json(orders);
});

app.get("/store/:id/review", (req, res) => {
  const { id } = req.params;
  return res.status(200).json(foodReviewData[id]);
});

app.post("/store/:id/review/ask", (req, res) => {
  const { id } = req.params;
  const { reviewImage, reviewContent, reviewGrade } = req.body;
  console.log(
    foodReviewData[id].reviews.unshift({
      reviewId: foodReviewData[id].reviews.length + 1,
      reviewName: "홍길동",
      reviewContent: reviewContent,
      reviewImage: reviewImage,
      reviewGrade: reviewGrade,
      createdAt: new Date(),
      comment: null,
    })
  );
  return res.status(200).end();
});

app.delete("/store/:id/review/:reviewId", (req, res) => {
  const { id, reviewId } = req.params;
  foodReviewData[id].reviews.splice(reviewId, 1);
  return res.status(200).end();
});

app.patch("/store/:id/review/:reviewId", (req, res) => {
  const { id, reviewId } = req.params;
  for (const key in req.body) {
    foodReviewData[id].reviews[reviewId][key] = req.body[key];
  }
  return res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
