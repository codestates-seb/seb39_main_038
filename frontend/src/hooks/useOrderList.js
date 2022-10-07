import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchOrderList = async () => {
  const response = await axios.get(API_URI.ORDER);
  return response;
};

function useOrderList() {
  return useQuery(['orderList'], fetchOrderList);
}

export { useOrderList };
