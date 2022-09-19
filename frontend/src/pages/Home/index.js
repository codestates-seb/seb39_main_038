import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
  const postAuthData = (api, data) => {
    if (api === null) return;
    axios
      .post(api, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    const redirectURI = new URL(window.location.href);
    const code = redirectURI.searchParams.get('code');
    if (!code) return;
    postAuthData(null, { code });
  }, []);

  return <div>Home</div>;
}

export default Home;
