const { data: foodListData } = require("./foodList");
const { createFoods } = require("./menuList");
const { data: foodReviewData } = require("./foodReview");

module.exports = { foodListData, foodReviewData, createFoods };
