import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchFoodDetail = (id) => async () => {
  const response = await axios.get(`${API_URI.FOODLIST}/${id}`);
  return response;
};

function useFoodDetail(id) {
  return useQuery(['foodDetail', id], fetchFoodDetail(id));
}

export { useFoodDetail };
