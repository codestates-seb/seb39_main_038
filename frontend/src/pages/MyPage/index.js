import React from 'react';
import { useMyPage } from '../../hooks';

function MyPage() {
  const { data: userData } = useMyPage();
  console.log(userData);
  return <div>테스트</div>;
}

export default MyPage;
