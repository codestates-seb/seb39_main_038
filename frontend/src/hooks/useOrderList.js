/* eslint-disable no-param-reassign */
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchOrderList = async () => {
  const response = await axios.get(API_URI.ORDER);
  return response;
};

const fetchUpdateOrderList = async (data) => {
  const { orderMenus, orderRequest, paymentType } = data;
  await axios.post(API_URI.ORDER, { orderMenus, orderRequest, paymentType });
};

function useOrderList() {
  const queryClient = useQueryClient();
  const { data } = useQuery(['orderList'], fetchOrderList, {
    select: (value) => {
      value.data.orders = value.data.orders.reverse();
      return value;
    },
  });
  const { mutateAsync: updateMutate } = useMutation(fetchUpdateOrderList, {
    onSuccess: () => queryClient.invalidateQueries(['orderList']),
  });
  return { data, updateMutate };
}

export { useOrderList };
