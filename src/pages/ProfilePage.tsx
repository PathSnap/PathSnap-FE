import React from 'react';
import IconMenu from '../icons/BottomSheeet/IconMenu';
import IconPhone from '../icons/ProfilePage/IconPhone';
import IconBirth from '../icons/ProfilePage/IconBirth';
import IconMyHome from '../icons/ProfilePage/IconMyHome';
import IconLeft from '../icons/ProfilePage/IconLeft';
import IconRight from '../icons/ProfilePage/IconRight';

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

const BoxWrapper: React.FC<BoxWrapperProps> = ({ children, className }) => {
  return (
    <div className={`w-full h-fit rounded-2xl shadow-l ${className}`}>
      {children}
    </div>
  );
};

const ShowProfile: React.FC = () => {
  return (
    <BoxWrapper className="flex flex-col gap-5 p-4">
      {/* 사진, 이름, 이메일 */}
      <div className={'grid grid-cols-[70px_auto_24px] gap-5 items-center'}>
        <img src="/cute.png" className={'aspect-square rounded-2xl'} />
        <div className={'flex flex-col gap-1.5'}>
          <div className={'text-[22px] font-semibold'}>이름</div>
          <div className={'text-xs text-second-light'}>asc1234@gmail.com</div>
        </div>
        <div className={'w-6 h-full place-items-end'}>
          <IconMenu width={5} height={24} />
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

const Calendar: React.FC = () => {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className={'flex flex-col gap-[14px]'}>
      <div className={'font-semibold'}>캘린더</div>
      <BoxWrapper className="flex flex-col px-4 py-6 items-center gap-5">
        {/* 캘린더 헤더 */}
        <div className={'flex gap-[14px] items-center'}>
          <IconLeft />
          <div className={'text-xxl font-semibold'}>2024 5월</div>
          <IconRight />
        </div>
        {/* 캘린더 요일 */}
        <div className="w-full h-14 px-4 mb-12">
          <div
            className={
              'w-full h-full flex justify-between items-center border-b-[1.5px] border-second-light/15 '
            }
          >
            {DAYS.map((day, index) => (
              <div
                key={index}
                className={'w-6 text-center text-second-light font-medium'}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        {/* 캘린더 본문 */}
        <div className={'w-full h-fit flex flex-col'}></div>
      </BoxWrapper>
      <button className={'is-active-green-button h-[58px] text-lg '}>
        일정을 하나로 묶어보세요!
      </button>
    </div>
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
