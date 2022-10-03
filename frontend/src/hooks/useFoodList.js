import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchFoodList = async () => {
  const response = await axios.get(API_URI.FOODLIST);
  return response;
};

function useFoodList() {
  return useQuery(['foodlist'], fetchFoodList);
}

export { useFoodList };
