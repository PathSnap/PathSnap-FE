import React from 'react';
import IconKakao from '../icons/LoginPage/IconKakao';
import IconNaver from '../icons/LoginPage/IconNaver';

const LoginPage: React.FC = () => {
  return (
    <div className={'grid grid-rows-3 h-full px-4 items-center'}>
      <div className={'text-second font-semibold text-3xl pl-5'}>
        간편 로그인으로
        <br />
        바로 이용하기
      </div>
      <div className={'w-full flex flex-col gap-5'}>
        <LoginButton
          icon={<IconKakao />}
          text={'카카오로 시작하기'}
          className={'bg-[#FAE100] text-[#371D1E]'}
        />
        <LoginButton
          icon={<IconNaver />}
          text="네이버로 시작하기"
          className={'bg-[#03C75A] text-white'}
        />
      </div>
    </div>
  );
};

export default LoginPage;

interface LoginButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  // 배경색, 글자색
  className: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  icon,
  text,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-full h-[58px] grid grid-cols-[40px_1fr_40px] items-center rounded-2xl px-5 ${className}`}
    >
      <div>{icon}</div>
      <div className={'font-semibold text-lg text-center'}>{text}</div>
      <div></div>
    </div>
  );
};
