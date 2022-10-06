const data = [];

for (let i = 0; i < 100; i++) {
  const reviews = [];
  for (let i = 0; i < 5; i++) {
    const obj = {
      reviewId: i,
      reviewName: "홍길동",
      reviewContent: "내용",
      reviewImage: null,
      reviewGrade: 5,
      createdAt: new Date(),
      comment: {
        commentId: i,
        commentContent: "답장",
        createdAt: new Date(),
      },
    };
    reviews.push(obj);
  }
  data.push({
    storeId: i,
    reviews: reviews,
    totalReview: 100,
    totalGrade: 4,
    totalComment: 100,
  });
}

module.exports = { data };
