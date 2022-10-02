import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Spinner } from '../Spinner';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';
import { atoms } from '../../store';

function FoodMenuList() {
  const [receipt, setReceipt] = useRecoilState(atoms.menuOrder);
  const setOrderList = useSetRecoilState(atoms.orderList);

  const [defaultObj, ...rest] = receipt;
  setOrderList(rest);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries(['getMenu']);

  const getMenuList = async () => {
    const res = await axios.get('http://localhost:8080/store');
    return res.data.menus;
  };

  const { isLoading, isError, data, error } = useQuery(
    ['getMenu'],
    getMenuList,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
      retryDelay: 3000,

      onSuccess: () => {
        alert('성공');
      },

      onError: (e) => {
        alert(e.message);
      },
    },
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return alert('음식을 불러오지 못했습니다.', error.message);
  }
  console.log(receipt);
  return data.map((menu) => (
    <Menu
      key={menu.id}
      onClick={() => {
        if (receipt === '123') {
          return defaultObj;
        }
        return setReceipt([...receipt, { count: menu.count, id: menu.id }]);
      }}
    >
      <MenuInfo>
        <Name>{menu.name}</Name>
        <Info>{menu.info}</Info>
        <Price>{menu.price}</Price>
      </MenuInfo>
      <MenuImg>
        <img alt="menuImg" src={menu.img} />
      </MenuImg>
    </Menu>
  ));
}

function DetailFoodList() {
  return (
    <Section>
      <FoodMenuList />
    </Section>
  );
}

export { DetailFoodList };
