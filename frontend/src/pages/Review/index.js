import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AskReview from './AskReview';
import UpdateReview from './UpdateReview';

function Review() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      alert('잘못된 접근 입니다.');
      navigate('/');
    }
  }, [navigate, location.state]);

  if (!location.state) return <div />;

  return location.state.type !== 'post' ? (
    <UpdateReview
      reviewId={location.state.reviewId}
      storeId={location.state.storeId}
    />
  ) : (
    <AskReview />
  );
}

export default Review;
