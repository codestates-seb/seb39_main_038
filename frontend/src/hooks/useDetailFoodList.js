import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchDetailFoodList = (id) => async () => {
  const response = await axios.get(`${API_URI.FOODLIST}/${id}/menus`);
  return response;
};

function useDetailFoodList(id) {
  return useQuery(['detailfoodlist', id], fetchDetailFoodList(id));
}

export { useDetailFoodList };
