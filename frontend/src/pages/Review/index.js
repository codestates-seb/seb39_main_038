import React from 'react';
import { useLocation } from 'react-router-dom';
import AskReview from './AskReview';
import UpdateReview from './UpdateReview';

function Review() {
  const location = useLocation();
  return location.state ? (
    <UpdateReview
      reviewId={location.state.reviewId}
      storeId={location.state.storeId}
    />
  ) : (
    <AskReview />
  );
}

export default Review;
