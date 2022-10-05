import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchReview = (id) => async () => {
  const response = await axios.get(API_URI.FOODREVIEW(id), fetchReview);
  return response;
};

function useReview(id) {
  return useQuery(['review', id], fetchReview(id));
}

export { useReview };
