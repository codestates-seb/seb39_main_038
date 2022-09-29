import React, { useEffect } from 'react';
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

  const postAuthData = async (api, code) => {
    const response = await axios.post(api, code);
    if (response.status === 226) return alert(response.data?.massage);
    axios.defaults.headers.common.Login = 'kakao';
    window.location.replace(ROUTE.HOME.PATH);
    return null;
  };

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(API_URI.KAKAO_LOGIN, { code }).catch(() =>
      alert(ALERT.CLIENT[500].MESSAGE),
    );
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
    </HomeContainer>
  );
}

export default Home;
