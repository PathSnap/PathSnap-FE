import React from 'react';
import IconBack from '../icons/IconBack';

const Profile: React.FC = () => {
  return (
    <div className={'w-full h-full flex flex-col'}>
      <HeaderBar />
    </div>
  );
};

export default Profile;

const HeaderBar: React.FC = () => {
  return (
    <div
      className={
        'grid grid-cols-[24px_1fr_24px] px-[22px] items-center h-[68px]'
      }
    >
      <IconBack width={24} height={24} />
      <div className={'text-second text-lg font-medium text-center'}>
        프로필 작성
      </div>
      <div></div>
    </div>
  );
};
