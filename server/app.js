/* /store?page={page}&size={size}&type={chinese} */
const express = require("express");
const cors = require("cors");
const { foodListData } = require("./data");

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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
