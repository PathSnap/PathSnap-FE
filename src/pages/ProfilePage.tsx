import React, { useEffect, useState } from 'react';
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
import useUserInfoStore from '../stores/UserInfo';
import useCalendarInfoStore, { Trip } from '../stores/Profiles/CalendarInfo';

const ProfilePage: React.FC = () => {
  return (
    <div
      className={
        'w-full h-full flex flex-col gap-6 py-7 px-[26px] text-second mb-20'
      }
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
  const { getUserInfo, userInfo } = useUserInfoStore((state) => state);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleClickMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const router = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 관리

  // 드롭다운 아이템들
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
  ];

  const formatPhoneNumber = (phoneNumber: string | null | undefined) => {
    if (!phoneNumber) return '전화번호 없음';
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserInfo();
      setIsLoading(false);
    };

    fetchData();
  }, [getUserInfo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // userInfo가 null 또는 undefined일 경우를 대비하여 기본값 설정
  const {
    images,
    userName = '미등록',
    phoneNumber,
    birthDate,
    address,
  } = userInfo || {};

  return (
    <BoxWrapper className="flex flex-col gap-5 p-4">
      {/* 사진, 이름, 이메일 */}
      <div className="grid grid-cols-[70px_auto_24px] gap-5 items-center">
        <img
          src={
            images?.[0]?.url ||
            'https://pathsnap1.s3.ap-northeast-2.amazonaws.com/DefualtUser.png'
          }
          alt="Profile"
          className="aspect-square rounded-2xl object-cover"
        />
        <div className="flex flex-col gap-1.5">
          <div className="text-[22px] font-semibold">
            {userName || '정보수정이 필요합니다.'}
          </div>
          {/* TODO : ADD EMAIL */}
          <div className="text-xs text-second-light">asc1234@gmail.com</div>
        </div>
        <div className="w-6 h-full place-items-end relative">
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
      <div className="grid grid-cols-3 text-xxs">
        <div className="flex gap-1 items-center">
          <IconPhone />
          <div>{formatPhoneNumber(phoneNumber)}</div>
        </div>
        <div className="flex gap-1 items-center">
          <IconBirth />
          <div>{birthDate || '미등록'}</div>
        </div>
        <div className="flex gap-1 items-center break-keep">
          <IconMyHome />
          <div>{address || '미등록'}</div>
        </div>
      </div>
    </BoxWrapper>
  );
};

const TimeLine: React.FC = () => {
  const { trips } = useCalendarInfoStore((state) => state);
  const tripsLength = trips.length;
  return (
    <div className={'flex flex-col gap-[14px]'}>
      <div className={'font-semibold'}>
        타임라인
        <span className={'pl-1.5 text-primary'}>{tripsLength}</span>
      </div>

      {trips
        .slice() // 원본 배열 복사
        .reverse() // 복사된 배열을 역순으로 정렬
        .map(
          (
            trip // 역순으로 정렬된 복사본을 매핑
          ) => (
            <TimeLineItem trip={trip} key={trip.recordId} />
          )
        )}
    </div>
  );
};

interface TimeLineProps {
  trip: Trip;
}

const TimeLineItem: React.FC<TimeLineProps> = ({ trip }) => {
  const router = useNavigate();
  return (
    <BoxWrapper className="grid grid-cols-[54px_auto_24px] gap-4 px-[18px] py-4 items-center">
      <img
        src={trip.image?.url ?? 'src/icons/Logo.svg'}
        className={'aspect-square rounded-2xl object-cover'}
      />
      <div className={'flex flex-col gap-1.5 text-sm'}>
        <div className={'font-bold'}>{trip.recordName}</div>
        <div>
          {trip.startDate.slice(0, 10).replaceAll('-', '.')}
          {/* 2024.02.12 ~ 2024.02.15 */}
          {/* <span className={'pl-3'}>8명</span> */}
        </div>
      </div>
      <IconRight
        onClick={() => {
          router('/', {
            state: {
              recordId: trip.recordId,
            },
          });
        }}
      />
    </BoxWrapper>
  );
};
