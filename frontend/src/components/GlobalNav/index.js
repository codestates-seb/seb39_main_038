import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  NavContainer,
  NavWrapper,
  NavLogo,
  ButtonInner,
  NavButton,
} from './styles';
import { ROUTE, COLOR } from '../../constants';
import { atoms, storge } from '../../store';

function GlobalNav() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(atoms.isLogin);

  const handleOnClick = () => {
    const isCheck = window.confirm('정말 로그아웃 하시겠습니까?');
    if (!isCheck) return;
    setIsLogin(false);
    storge.setData('isLogin', false);
    navigate(ROUTE.HOME, { replace: true });
  };

  const isLoginComponent = () => {
    if (isLogin)
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
