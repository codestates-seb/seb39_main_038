import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URI } from '../constants';

const deleteMenu = async (data) => {
  const { storeId, e } = data;
  const res = await axios.delete(`${API_URI.PATCHDELETEMENU(storeId, e)}`);
  return res;
};

const patchMenu = async (data) => {
  const { storeId, e, value } = data;
  const res = await axios.patch(
    `${API_URI.PATCHDELETEMENU(storeId, e)}`,
    value,
  );
  return res;
};

const postMenu = async (data) => {
  const { storeId, value } = data;
  const res = await axios.post(`${API_URI.POSTMENU(storeId)}`, value);
  return res;
};

const postInfo = async (data) => {
  const { value } = data;
  const res = await axios.post(`${API_URI.POSTINFO}`, value);
  if (res.data.message) {
    alert(res.data.message);
  }

  return res;
};

const patchInfo = async (data) => {
  const { storeId, value } = data;
  const res = await axios.patch(`${API_URI.PATCHDELETEINFO(storeId)}`, value);
  if (res.data.message) {
    alert(res.data.message);
  }
  return res;
};

const deleteInfo = async (data) => {
  const { storeId } = data;
  const res = await axios.delete(`${API_URI.PATCHDELETEINFO(storeId)}`);
  return res;
};

function useSetting() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries(['detailfoodlist']);
  };

  const { mutate: postMutateMenu } = useMutation(postMenu, {
    onSuccess,
  });

  const { mutate: postMutateInfo } = useMutation(postInfo, {
    onSuccess,
  });

  const { mutate: patchMutateInfo } = useMutation(patchInfo, {
    onSuccess,
  });

  const { mutate: deleteMutateInfo } = useMutation(deleteInfo, {
    onSuccess,
  });

  const { mutate: deleteMutateMenu } = useMutation(deleteMenu, {
    onSuccess,
  });

  const { mutate: patchMutateMenu } = useMutation(patchMenu, {
    onSuccess,
  });

  return {
    postMutateMenu,
    postMutateInfo,
    patchMutateInfo,
    deleteMutateInfo,
    deleteMutateMenu,
    patchMutateMenu,
  };
}

export { useSetting };
