/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchOrderList = async () => {
  const response = await axios.get(API_URI.ORDER);
  return response;
};

function useOrderList() {
  return useQuery(['orderList'], fetchOrderList, {
    select: (data) => {
      data.data.orders = data.data.orders.reverse();
      return data;
    },
  });
}

export { useOrderList };
