/* /store?page={page}&size={size}&type={chinese} */
const express = require("express");
const cors = require("cors");
const { foodListData, createFoods } = require("./data");

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
  return res
    .status(200)
    .json({ storeId: Number(id), storeMenu: createFoods(id) });
});

app.post("/local/mypage", (req, res) => {
  return res.status(200).json({
    data: {
      avatar: null,
      email: "abs@naver.com",
      name: "홍길동",
      phone: "010-2222-2222",
    },
  });
});

app.post("/kakao/mypage", (req, res) => {
  return res.status(200).json({
    data: { email: "abs@naver.com", nickname: "홍길동", profileImage: null },
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
