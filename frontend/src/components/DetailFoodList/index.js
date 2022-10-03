import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Spinner } from '../Spinner';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';
import { atoms } from '../../store';

const getMenuList = async () => {
  const res = await axios.get('http://localhost:8080/store');
  return res.data.menus;
};

function FoodMenuList() {
  const [receipt, setReceipt] = useRecoilState(atoms.menuOrder);
  const [orderList, setOrderList] = useRecoilState(atoms.orderList);

  const [defaultObj, ...rest] = receipt;
  // setOrderList(rest)

  const { isLoading, isError, data, error } = useQuery(
    ['getMenu'],
    getMenuList,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: () => {
        alert('성공');
      },
      onError: () => {
        alert('실패');
      },
    },
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return alert('음식을 불러오지 못했습니다.', error.message);
  }

  return data.map((menu) => (
    <Menu
      key={menu.id}
      onClick={() => {
        setOrderList(rest, () => {
          console.log('re', orderList);
        });
        if (receipt === '123') {
          return defaultObj;
        }

        return setReceipt([
          ...receipt,
          {
            count: 1,
            id: menu.id,
            name: menu.name,
            price: menu.price,
          },
        ]);
      }}
    >
      {console.log(orderList)}
      <MenuInfo>
        <Name>{menu.name}</Name>
        <Info>{menu.content}</Info>
        <Price>{menu.price}</Price>
      </MenuInfo>
      <MenuImg>
        <img alt="menuImg" src={menu.image} />
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
