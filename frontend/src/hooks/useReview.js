import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchReview = (id) => async () => {
  const response = await axios.get(API_URI.FOODREVIEW(id), fetchReview);
  return response;
};

const fetchDeleteReiew = async (data) => {
  const { sid, rid } = data;
  await axios.delete(`${API_URI.FOODREVIEW(sid)}/${rid}`);
};

const fetchUpdateReiew = async (data) => {
  const { sid, rid, value } = data;
  await axios.patch(`${API_URI.FOODREVIEW(sid)}/${rid}`, value);
};

function useReview(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery(['review', id], fetchReview(id));

  const { mutate: deleteMutate } = useMutation(fetchDeleteReiew, {
    onSuccess: () => queryClient.invalidateQueries(['review', id]),
  });

  const { mutate: updateMutate } = useMutation(fetchUpdateReiew, {
    onSuccess: () => queryClient.invalidateQueries(['review', id]),
  });

  return { data, deleteMutate, updateMutate };
}

export { useReview };
