import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Spinner } from '../Spinner';
import { Section, Menu, MenuInfo, Name, Info, Price, MenuImg } from './styles';

function FoodMenuList() {
  const queryClient = useQueryClient();

  const getMenuList = async () => {
    const res = await axios.get('/store/1');
    return res.menu;
  };

  const { isLoading, isError, data, error } = useQuery(
    ['getMenu'],
    getMenuList,
    {
      refetchOnWindowFocus: false,

      onSuccess: (res) => {
        alert(res);
        queryClient.invalidateQueries(['getMenu']);
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

  return data.map((menu) => (
    <Menu key={menu.id}>
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
  const AddOrder = () => {
    const orderMenus = [
      { menuId: 1, count: 2, price: 24000 },
      { totalPrice: 24000 },
    ];
    window.sessionStorage.setItem('orderMenus', JSON.stringify(orderMenus));
    // axios
    //   .post('ec2-13-124-94-129.ap-northeast-2.compute.amazonaws.com/order', {
    //    window.sessionStorage.getItem(orderMenus)
    //   })
    //   .then(() => {
    //     alert('success');
    //   })
    //   .catch((res) => {
    //     alert(res);
    //   });
  };

  const onHandlerGetCart = () => {
    AddOrder();
  };

  return (
    <Section>
      <FoodMenuList />
      <Menu onClick={onHandlerGetCart}>
        <MenuInfo>
          <Name>치킨</Name>
          <Info>빠삭한 치킨입니다!</Info>
          <Price>12,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>치킨</Name>
          <Info>빠삭한 치킨입니다!</Info>
          <Price>12,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>햄버거</Name>
          <Info>두툼한 햄버거입니다!</Info>
          <Price>8,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>

      <Menu>
        <MenuInfo>
          <Name>피자</Name>
          <Info>말랑한 피자입니다!</Info>
          <Price>18,000원</Price>
        </MenuInfo>

        <MenuImg>
          <img alt="thumb" />
        </MenuImg>
      </Menu>
    </Section>
  );
}

export { DetailFoodList };
