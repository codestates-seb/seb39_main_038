/* /store?page={page}&size={size}&type={chinese} */
const express = require("express");
const cors = require("cors");
const { foodListData } = require("./data");

const app = express();
const PORT = 80;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/store", (req, res) => {
  return res.status(200).json(foodListData);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
