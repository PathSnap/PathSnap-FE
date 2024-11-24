import React, { useState } from 'react';
import IconMenu from '../icons/BottomSheeet/IconMenu';
import IconPhone from '../icons/ProfilePage/IconPhone';
import IconBirth from '../icons/ProfilePage/IconBirth';
import IconMyHome from '../icons/ProfilePage/IconMyHome';
import IconRight from '../icons/ProfilePage/IconRight';
import Dropdown from '../components/BottomSheet/Dropdown';
import IconEdit from '../icons/BottomSheeet/IconEdit';
import IconLogout from '../icons/ProfilePage/IconLogout';
import { useNavigate } from 'react-router';
import Calendar from '../components/Profile/Calendar';

const ProfilePage: React.FC = () => {
  return (
    <div
      className={'w-full h-full flex flex-col gap-6 py-7 px-[26px] text-second'}
    >
      <ShowProfile />
      <Calendar />
      <TimeLine />
    </div>
  );
};

export default ProfilePage;

interface BoxWrapperProps {
  children: React.ReactNode;
  className: string;
}

export const BoxWrapper: React.FC<BoxWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full h-fit rounded-2xl shadow-l ${className}`}>
      {children}
    </div>
  );
};

const ShowProfile: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleClickMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const router = useNavigate();

  //   드롭다운 아이템들
  const dropdownItems = [
    {
      name: '프로필 수정',
      onClick: () => {
        setIsDropdownOpen(false);
        router('/profile/edit');
      },
      component: IconEdit,
    },
    {
      name: '로그아웃',
      onClick: () => {
        setIsDropdownOpen(false);
      },
      component: IconLogout,
    },
    // {
    //   name: '회원탈퇴',
    //   onClick: () => {},
    //   component: () => {},
    // },
  ];
  return (
    <BoxWrapper className="flex flex-col gap-5 p-4">
      {/* 사진, 이름, 이메일 */}
      <div className={'grid grid-cols-[70px_auto_24px] gap-5 items-center'}>
        <img src="/cute.png" className={'aspect-square rounded-2xl'} />
        <div className={'flex flex-col gap-1.5'}>
          <div className={'text-[22px] font-semibold'}>이름</div>
          <div className={'text-xs text-second-light'}>asc1234@gmail.com</div>
        </div>
        <div className={'w-6 h-full place-items-end relative'}>
          <IconMenu width={5} height={24} onClick={handleClickMenu} />
          {isDropdownOpen && (
            <Dropdown
              setIsDropdownOpen={setIsDropdownOpen}
              dropdownItems={dropdownItems}
              className="right-5 -top-1"
            />
          )}
        </div>
      </div>
      {/* 전화번호, 생년월일, 집 주소 */}
      <div className={'flex justify-between text-xxs'}>
        <div className={'flex gap-1 items-center'}>
          <IconPhone />
          <div>010-1234-1234</div>
        </div>
        <div className={'flex gap-1 items-center'}>
          <IconBirth />
          <div>2002.09.14</div>
        </div>
        <div className={'flex gap-1 items-center'}>
          <IconMyHome />
          <div>부천시 소사구 대산동</div>
        </div>
      </div>
    </BoxWrapper>
  );
};

const TimeLine: React.FC = () => {
  return (
    <div className={'flex flex-col gap-[14px]'}>
      <div className={'font-semibold'}>
        타임라인
        <span className={'pl-1.5 text-primary'}>17</span>
      </div>
      <TimeLineItem />
    </div>
  );
};

const TimeLineItem: React.FC = () => {
  return (
    <BoxWrapper className="grid grid-cols-[54px_auto_24px] gap-4 px-[18px] py-4 items-center">
      <img src="/cute.png" className={'aspect-square rounded-2xl'} />
      <div className={'flex flex-col gap-1.5 text-sm'}>
        <div className={'font-bold'}>독서모임 여행</div>
        <div>
          2024.02.12 ~ 2024.02.15<span className={'pl-3'}>8명</span>
        </div>
      </div>
      <IconRight />
    </BoxWrapper>
  );
};
