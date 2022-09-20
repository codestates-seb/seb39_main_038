import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URI, MENU, ROUTE } from '../../constants';
import Thumbnail from '../../components/Thumbnail';
import { HomeContainer, HomeWrapper, Banner } from './styles';

function Home() {
  const navigate = useNavigate();
  const postAuthData = (api) => {
    if (api === null) return;
    axios
      .get(api)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(`${API_URI.KAKAO_LOGIN}?code=${code}`);
  }, []);

  const createThumbnail = () => {
    return MENU.map((item) => (
      <Thumbnail
        id={item.id}
        title={item.title}
        src={item.src}
        alt={item.title}
        query={item.query}
      />
    ));
  };

  const hanldeOnClick = (e) => {
    const $container = e.target.closest('div');
    navigate(`/${ROUTE.FOODLIST.PATH}`, {
      state: { query: $container.dataset.query },
    });
  };

  return (
    <HomeContainer>
      <Banner primary />
      <HomeWrapper onClick={hanldeOnClick}>{createThumbnail()}</HomeWrapper>
    </HomeContainer>
  );
}

export default Home;
