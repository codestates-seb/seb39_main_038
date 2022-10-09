import React, { useState } from 'react';
import { useDetailFoodList } from '../../../hooks';
import { UpdateInput, TypeInfo } from '../styles';
import { useSetting } from '../../../hooks/useSetting';

function FoodMenusList({ storeId, props }) {
  const [inputs, setInputs] = useState({
    menuName: '',
    menuPrice: '',
    menuContent: '',
    menuImg: null,
  });

  const { menuName, menuPrice, menuContent, menuImg } = inputs;
  const { patchMutateMenu, deleteMutateMenu } = useSetting();

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const formHandler = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  return (
    <UpdateInput>
      <img
        alt="FoodImage"
        name="menuImg"
        value={menuImg}
        onChange={onChange}
        src={props.image}
      />

      <TypeInfo onSubmit={formHandler}>
        <input
          placeholder={props.name}
          name="menuName"
          value={menuName}
          onChange={onChange}
        />

        <input
          placeholder={props.content}
          name="menuContent"
          value={menuContent}
          onChange={onChange}
        />

        <input
          placeholder={props.price}
          name="menuPrice"
          value={menuPrice}
          onChange={onChange}
        />
      </TypeInfo>

      <button
        type="button"
        onClick={() => {
          if (
            menuPrice &&
            menuContent &&
            menuName
            //  && menuImg
          ) {
            alert('음식 수정 완료');
            const e = props.menuId;
            const value = {
              name: menuName,
              price: menuPrice,
              content: menuContent,
              image: menuImg,
            };
            patchMutateMenu({ storeId, e, value });
          } else {
            alert('모든 정보를 입력해 주세요');
          }
        }}
      >
        수정
      </button>
      <button
        type="button"
        onClick={() => {
          alert('음식 제거 완료');
          const e = props.menuId;
          deleteMutateMenu({ storeId, e });
        }}
      >
        제거
      </button>
    </UpdateInput>
  );
}

function MenuList({ storeId }) {
  const { data } = useDetailFoodList(storeId);
  // console.log(data.data.menus);
  return (
    <>
      {data.data.menus.map((props) => (
        <FoodMenusList key={props.menuId} props={props} storeId={storeId} />
      ))}
    </>
  );
}

export default MenuList;
