import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../../constants';
import Thumbnail from '../../components/Thumbnail';
import { HomeContainer, HomeWrapper, Banner } from './styles';

function Home() {
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

  return (
    <HomeContainer>
      <Banner primary />
      <HomeWrapper>
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
        <Thumbnail
          title="피자/양식"
          src="https://www.yogiyo.co.kr/mobile/image/category-03.png"
          alt="피자/양식"
        />
      </HomeWrapper>
    </HomeContainer>
  );
}

export default Home;
