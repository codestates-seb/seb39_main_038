import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { atoms } from '../../store';
import { ALERT, API_URI, MENU, ROUTE } from '../../constants';
import { Banner, Thumbnail } from '../../components';
import { HomeContainer, HomeWrapper } from './styles';

function Home() {
  const navigate = useNavigate();
  const setMenuQuery = useSetRecoilState(atoms.menuQuery);
  const setIsLogin = useSetRecoilState(atoms.isLogin);

  const postAuthData = useCallback(
    async (api, code) => {
      const response = await axios.post(api, code);
      if (response.status === 226) return alert(response.data?.massage);
      window.location.replace(ROUTE.HOME.PATH);
      setIsLogin({ state: true, type: 'kakao' });
      return null;
    },
    [setIsLogin],
  );

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(API_URI.KAKAO_LOGIN, { code }).catch(() =>
      alert(ALERT.CLIENT[500].MESSAGE),
    );
  }, [postAuthData]);

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
    if (!$container.dataset.query) return;
    setMenuQuery($container.dataset.query);
    navigate(`/${ROUTE.FOODLIST.PATH}`);
  };

  return (
    <HomeContainer>
      <Banner primary />
      <HomeWrapper onClick={hanldeOnClick}>{createThumbnail()}</HomeWrapper>
    </HomeContainer>
  );
}

export default Home;
