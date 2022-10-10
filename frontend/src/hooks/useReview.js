import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchReview = (id) => async () => {
  const response = await axios.get(API_URI.FOODREVIEW(id), fetchReview);
  return response;
};

const fetchDeleteReview = async (data) => {
  const { sid, rid } = data;
  await axios.delete(`${API_URI.FOODREVIEW(sid)}/${rid}`);
};

const fetchUpdateReview = async (data) => {
  const { sid, rid, value } = data;
  await axios.patch(`${API_URI.FOODREVIEW(sid)}/${rid}`, value);
};

const fetchCreateReview = async (data) => {
  const { sid, value } = data;
  await axios.post(`${API_URI.FOODREVIEW(sid)}/ask`, value);
};

function useReview(id) {
  const queryClient = useQueryClient();
  const { data } = useQuery(['review', id.toString()], fetchReview(id));

  const { mutate: deleteMutate } = useMutation(fetchDeleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['review', id.toString()]);
      queryClient.invalidateQueries(['foodDetail', id.toString()]);
    },
  });

  const { mutateAsync: updateMutate } = useMutation(fetchUpdateReview, {
    onSuccess: () => queryClient.invalidateQueries(['review', id.toString()]),
  });

  const { mutateAsync: createMutate } = useMutation(fetchCreateReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(['review', id.toString()]);
      queryClient.invalidateQueries(['foodDetail', id.toString()]);
    },
  });

  return { data, deleteMutate, updateMutate, createMutate };
}

export { useReview };
