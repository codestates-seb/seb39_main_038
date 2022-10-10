/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTE } from '../../constants';

// eslint-disable-next-line react/function-component-definition
const withAuth = (Component) => (props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (Number(id) !== JSON.parse(sessionStorage.getItem('storeId')).localId) {
      alert('로그인 정보와 다른 정보입니다.');

      navigate(ROUTE.HOME.PATH);
    }
  }, [id, navigate]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

export { withAuth };