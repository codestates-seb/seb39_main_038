/* eslint-disable react/react-in-jsx-scope */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTE } from '../../constants';
import { useFoodDetail } from '../../hooks';

// eslint-disable-next-line react/function-component-definition
const withAuth = (Component) => (props) => {
  const { id } = useParams();
  const { data } = useFoodDetail(id);

  const navigate = useNavigate();
  useEffect(() => {
    if (data.data.data.storeId) {
      if (data.data.data.storeId !== /* 고정 LocalId atom 자리 */ 1) {
        alert('로그인 정보와 다른 정보입니다.');

        navigate(ROUTE.HOME.PATH);
      }
    }
  }, [navigate]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

export { withAuth };
