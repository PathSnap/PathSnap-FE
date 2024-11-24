import React from 'react';
import { HeaderBar } from './RegisterPage';

const EditProfilePage: React.FC = () => {
  return (
    <div className={'w-full h-full px-9 relative text-second flex flex-col'}>
      <HeaderBar headerText="프로필 수정" />
    </div>
  );
};

export default EditProfilePage;
