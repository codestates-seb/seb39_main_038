import React, { useState } from 'react';
import LoginNav from './LoginNav';
import ProviderLogin from './ProviderLogin';
import ConsumerLogin from './ConsumerLogin';

function Login() {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <>
      <LoginNav isChecked={isChecked} setIsChecked={setIsChecked} />
      {isChecked ? <ConsumerLogin /> : <ProviderLogin />}
    </>
  );
}

export default Login;
