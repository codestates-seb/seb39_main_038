import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../store';
import { API_URI, MENU, ROUTE } from '../../constants';
import { Banner, Thumbnail, CustomModal } from '../../components';
import { HomeContainer, HomeWrapper } from './styles';
import { useModal } from '../../hooks';

function Home() {
  const navigate = useNavigate();
  const setMenuQuery = useSetRecoilState(atoms.menuQuery);
  const [openFood, closeFood] = useModal('food');
  const [openOrder, closeOrder] = useModal('order');
  const [openEmail, closeEmail] = useModal('email');

  const postAuthData = (api, code) => {
    if (api === null) return;
    axios
      .post(api, code, { withCredentials: true })
      .then(() => {
        // 리다이렉션 해제
        // window.location.replace('/');
        console.log(
          window.location.origin,
          window.location.host,
          window.location.protocol,
          window.location.ancestorOrigins,
        );
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(API_URI.KAKAO_LOGIN, { code });
  }, []);

  const createThumbnail = () => {
    return MENU.map((item) => (
      <Thumbnail
        key={item.id}
        title={item.title}
        src={item.src}
        alt={item.title}
        query={item.query}
      />
    ));
  };

  const hanldeOnClick = (e) => {
    const $container = e.target.closest('div');
    setMenuQuery($container.dataset.query);
    navigate(`/${ROUTE.FOODLIST.PATH}`);
  };

  return (
    <HomeContainer>
      <Banner primary />
      <HomeWrapper onClick={hanldeOnClick}>{createThumbnail()}</HomeWrapper>
      <button type="button" onClick={openFood}>
        Food 모달
      </button>
      <button type="button" onClick={openOrder}>
        Order 모달
      </button>
      <button type="button" onClick={openEmail}>
        Email 모달
      </button>
      <CustomModal.Food closeModal={closeFood} />
      <CustomModal.Order closeModal={closeOrder} />
      <CustomModal.Email closeModal={closeEmail} />
    </HomeContainer>
  );
}

export default Home;
