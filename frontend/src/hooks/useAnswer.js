import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchAnswer = async ({ id, value }) => {
  console.log(id, value);
  const { storeId, reviewId, commentContent } = value;
  await axios.post(API_URI.ANSWER(id), { storeId, reviewId, commentContent });
};

function useAnswer(id) {
  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation(fetchAnswer, {
    onSuccess: () => {
      queryClient.invalidateQueries(['review', id]);
    },
  });
  return { createMutate };
}

export { useAnswer };