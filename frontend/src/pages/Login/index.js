import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoginNav from './LoginNav';
import ProviderLogin from './ProviderLogin';
import ConsumerLogin from './ConsumerLogin';

function Login() {
  const location = useLocation();
  const toRegister = !location.state;
  const [isChecked, setIsChecked] = useState(toRegister);
  return (
    <>
      <LoginNav isChecked={isChecked} setIsChecked={setIsChecked} />
      {isChecked ? <ConsumerLogin /> : <ProviderLogin />}
    </>
  );
}

export default Login;
