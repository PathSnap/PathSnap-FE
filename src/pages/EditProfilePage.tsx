import React, { useState } from 'react';
import { HeaderBar } from './RegisterPage';
import IconCamera from '../icons/ProfilePage/IconCamera';
import ProfileForm from '../components/Profile/ProfileForm';

const EditProfilePage: React.FC = () => {
  const [isFill, setIsFill] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleClickSaveBtn = () => {
    console.log('click');
    setIsSubmit(true);
  };

  return (
    <div className={'w-full h-full px-9 relative text-second flex flex-col'}>
      <HeaderBar headerText="프로필 수정" />
      <div className={'pt-24 gap-[30px] flex flex-col flex-grow relative'}>
        <img
          src="/cute.png"
          className="w-[120px] aspect-square rounded-full place-self-center"
        />
        <div
          className={
            'w-[120px] aspect-square rounded-full bg-black/30 absolute left-1/2 -translate-x-1/2 grid place-items-center'
          }
        >
          <IconCamera />
        </div>
        <ProfileForm setIsFill={setIsFill} isSubmit={isSubmit} />
      </div>
      {/* 버튼 */}
      <div className={'flex gap-4 py-10'}>
        <button className={'w-full h-[58px] text-lg gray-button'}>취소</button>
        <button
          onClick={handleClickSaveBtn}
          className={`w-full h-[58px] text-lg ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
