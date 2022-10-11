/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { ROUTE } from '../../constants';
import { atoms } from '../../store';

// eslint-disable-next-line react/function-component-definition
const withAuth = (Component) => (props) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { localId } = useRecoilValue(atoms.loginInfo);
  const { state } = useRecoilValue(atoms.isLogin);

  useEffect(() => {
    console.log(id !== localId, 'url:', id, 'local:', localId);
    if (state) {
      if (Number(id) !== localId) {
        alert('로그인 정보와 다른 정보입니다.');

        navigate(ROUTE.HOME.PATH);
      }
    } else {
      alert('로그인을 먼저 하셔야 합니다.');
      navigate(ROUTE.HOME.PATH);
    }
  }, [id, navigate]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

export { withAuth };
