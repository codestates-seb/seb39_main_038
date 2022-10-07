import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { atoms } from '../store';
import { API_URI } from '../constants';

const fetchLocalMypage = (loginType) => async () => {
  let api;
  if (loginType === 'local') api = API_URI.LOCAL_MYPAGE;
  if (loginType === 'kakao') api = API_URI.KAKAO_MYPAGE;
  const response = await axios.post(api, {});
  return response;
};

function useMyPage() {
  const { type } = useRecoilValue(atoms.isLogin);
  return useQuery(['mypage', type], fetchLocalMypage(type), {
    select: (data) => {
      if (type === 'kakao') {
        const target = data.data.data;
        target.name = target.nickname;
        target.avatar = target.profileImage;
      }
      return data;
    },
  });
}

export { useMyPage };
