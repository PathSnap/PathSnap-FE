import React, { useState } from 'react';
import IconBack from '../icons/IconBack';
import { useNavigate } from 'react-router';
import ProfileForm from '../components/Profile/ProfileForm';

const RegisterPage: React.FC = () => {
  const [isFill, setIsFill] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleClickSaveBtn = () => {
    setIsSubmit(true);
  };

  return (
    <div className={'w-full h-full px-9 relative text-second flex flex-col'}>
      <HeaderBar headerText="프로필 작성" />
      <ProfileForm
        isRegisterPage={true}
        setIsFill={setIsFill}
        isSubmit={isSubmit}
      />
      {/* 버튼 */}
      <div className={'flex gap-4 py-10'}>
        <button className={'w-1/3 h-[58px] text-lg gray-button'}>
          건너뛰기
        </button>
        <button
          onClick={handleClickSaveBtn}
          type="submit"
          className={`w-2/3 h-[58px] text-lg ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

interface HeaderBarProps {
  headerText: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ headerText }) => {
  const router = useNavigate();
  return (
    <div
      className={
        'grid grid-cols-[24px_1fr_24px] px-[22px] items-center h-[68px] fixed top-0 w-full left-0 bg-white z-10'
      }
    >
      <IconBack
        width={24}
        height={24}
        onClick={() => {
          router(-1);
        }}
      />
      <div className={'text-lg font-medium text-center'}>{headerText}</div>
      <div></div>
    </div>
  );
};
