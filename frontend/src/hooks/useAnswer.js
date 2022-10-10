import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const fetchCreateAnswer = async ({ id, value }) => {
  const { storeId, reviewId, commentContent } = value;
  await axios.post(`${API_URI.ANSWER(id)}/comment/ask`, {
    storeId,
    reviewId,
    commentContent,
  });
};

const fetchUpdateAnswer = async ({ id, value }) => {
  const { storeId, reviewId, commentContent, commentId } = value;
  await axios.patch(`${API_URI.ANSWER(id)}/${commentId}`, {
    storeId,
    reviewId,
    commentId,
    commentContent,
  });
};

const fetchDeleteAnswer = async ({ id, value }) => {
  const { commentId } = value;
  await axios.delete(`${API_URI.ANSWER(id)}/${commentId}`);
};

function useAnswer(id) {
  const queryClient = useQueryClient();
  const { mutate: createMutate } = useMutation(fetchCreateAnswer, {
    onSuccess: () => queryClient.invalidateQueries(['review', id]),
  });
  const { mutate: updateMutate } = useMutation(fetchUpdateAnswer, {
    onSuccess: () => queryClient.invalidateQueries(['review', id]),
  });
  const { mutate: deleteMutate } = useMutation(fetchDeleteAnswer, {
    onSuccess: () => queryClient.invalidateQueries(['review', id]),
  });

  return { createMutate, updateMutate, deleteMutate };
}

export { useAnswer };
