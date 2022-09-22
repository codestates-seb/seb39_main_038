import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URI } from '../../constants';

function Home() {
  const postAuthData = (api, data) => {
    if (api === null) return;
    axios
      .post(api, data)
      .then((res) => console.log(res.headers))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(API_URI.KAKAO_LOGIN, { code });
  }, []);

  return <div>Home</div>;
}

export default Home;
