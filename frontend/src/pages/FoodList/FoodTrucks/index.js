import React, { useRef, useCallback } from 'react';
import { FoodListContainer, FoodListWrapper } from './styles';
import { FoodTruck, Spinner } from '../../../components';
import { COLOR } from '../../../constants';
import { useFoodList } from '../../../hooks';

function FoodTrucks() {
  const { data, fetchNextPage, hasNextPage } = useFoodList();
  const observer = useRef(null);

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
        },
        { threshold: 1 },
      );
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage],
  );

  const createFoodTruck = () => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const page of data.pages) result.push(...page.data.data);

    return result.map((item) => {
      return <FoodTruck key={item.storeId} data={item} />;
    });
  };

  return (
    <FoodListContainer>
      <FoodListWrapper>{createFoodTruck()}</FoodListWrapper>
      {hasNextPage ? (
        <Spinner
          scroll
          color={COLOR.NAVY}
          size={50}
          lastItemRef={lastItemRef}
        />
      ) : null}
    </FoodListContainer>
  );
}

export default FoodTrucks;
