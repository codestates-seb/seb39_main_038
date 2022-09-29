import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import {
  NavContainer,
  NavWrapper,
  NavLogo,
  ButtonInner,
  NavButton,
} from './styles';
import { ROUTE, COLOR, API_URI } from '../../constants';
import { atoms } from '../../store';

function GlobalNav() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(atoms.isLogin);

  const handleOnClick = async () => {
    const isCheck = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!isCheck) return;
    if (isLogin.type === 'kakao') await axios.post(API_URI.KAKAO_LOGOUT);
    if (isLogin.type === 'local') await axios.post(API_URI.LOGOUT);
    setIsLogin({ state: false, type: null });
    navigate(ROUTE.HOME.PATH);
  };

  const isLoginComponent = () => {
    if (isLogin.state)
      return (
        <ButtonInner>
          <NavButton onClick={handleOnClick} color={COLOR.YELLOW}>
            {ROUTE.LOGOUT.NAME}
          </NavButton>
          <Link to={ROUTE.BASKET.PATH}>
            <NavButton color={COLOR.WHITE}>{ROUTE.BASKET.NAME}</NavButton>
          </Link>
        </ButtonInner>
      );

    return (
      <ButtonInner>
        <Link to={ROUTE.LOGIN.PATH}>
          <NavButton color={COLOR.YELLOW}>{ROUTE.LOGIN.NAME}</NavButton>
        </Link>
      </ButtonInner>
    );
  };
  return (
    <NavContainer>
      <NavWrapper>
        <Link to={ROUTE.HOME.PATH}>
          <NavLogo />
        </Link>
        {isLoginComponent()}
      </NavWrapper>
    </NavContainer>
  );
}

export { GlobalNav };
