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
  const { data, isError } = useQuery(['orderList'], fetchOrderList);
  const { mutateAsync: updateMutate } = useMutation(fetchUpdateOrderList, {
    onSuccess: () => queryClient.invalidateQueries(['orderList']),
  });
  if (isError) return { updateMutate };
  return { data, updateMutate };
}

export { useOrderList };
