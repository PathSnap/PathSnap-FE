import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const access = params.get('access');
    const redirect = params.get('redirect');

    if (access) {
      // 토큰 저장
      if (localStorage.getItem('accessToken')) {
        localStorage.removeItem('accessToken');
      }
      localStorage.setItem('accessToken', access);
    }
    if (userId) {
      // 사용자 정보 저장
      localStorage.setItem('userId', userId);
    }

    // 리다이렉트
    navigate(redirect || '/');
  }, [navigate]);

  return <div>OAuth2 인증 중...</div>;
};

export default OAuth2Callback;
