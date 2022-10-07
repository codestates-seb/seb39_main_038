import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { API_URI } from '../constants';
import { atoms } from '../store';

const fetchFoodList =
  (menu) =>
  async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `${API_URI.FOODLIST}?page=${pageParam}&size=15&type=${menu}`,
    );
    return response;
  };

function useFoodList() {
  const menuQuery = useRecoilValue(atoms.menuQuery);
  return useInfiniteQuery(['foodlist', menuQuery], fetchFoodList(menuQuery), {
    getNextPageParam: (lastPage) => {
      const { page = null, totalPages = null } = lastPage.data.pageInfo;
      if (page < totalPages) return page + 1;
      return undefined;
    },
  });
}

export { useFoodList };
