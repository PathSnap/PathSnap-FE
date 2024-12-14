import React from 'react';
import IconHome from '../icons/Footer/IconHome';
import IconPerson from '../icons/Footer/IconPerson';
import { useLocation, useNavigate } from 'react-router';
import IconRecord from '../icons/Footer/IconRecord';
import useModalStore from '../stores/Modals/ModalStore';
import useDetailModalTypeStore from '../stores/Modals/DetailModalType';
import useRouteRecordStore from '../stores/RouteRecord';
import useUserInfoStore from '../stores/UserInfo';

interface MenuItem {
  component: React.FC<{ isActive: boolean }>;
  text: string;
  onClick: () => void;
}

const Footer: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();
  const isLogin = useUserInfoStore((state) => state.isLogin);

  const menuItems: MenuItem[] = [
    {
      component: IconHome,
      text: '홈',
      onClick: () => {
        router('/');
      },
    },
    {
      component: IconPerson,
      text: '프로필',
      onClick: () => router('/profile'),
    },
  ];

  const { openModal } = useModalStore();
  const { setDetailModalType } = useDetailModalTypeStore();
  const { recordingInfo, saveRouteRecord } = useRouteRecordStore();

  const handleClickRecord = () => {
    if (!isLogin) return;
    // 기록중이 아님
    if (!recordingInfo.isRecording) {
      setDetailModalType('recordType');
      openModal('detailModal');
    } else {
      // 기록중 -> 기록 중단
      saveRouteRecord();
    }
  };

  return (
    <div className="max-w-[500px] w-full fixed h-20 bottom-0 flex justify-around items-center shadow-xs rounded-t-2xl z-50 bg-white">
      <div
        className={
          'absolute bg-primary w-[68px] h-[68px] rounded-full bottom-[42px] z-40 grid place-items-center'
        }
      >
        <IconRecord
          isRecording={recordingInfo.isRecording}
          onClick={() => handleClickRecord()}
        />
      </div>

      {menuItems.map((menuItem, menuIndex) => {
        const Component = menuItem.component;
        const isActive =
          location.pathname === (menuIndex === 0 ? '/' : '/profile');

        return (
          <div
            key={menuIndex}
            className="flex flex-col justify-center items-center gap-1.5 "
            onClick={() => {
              menuItem.onClick();
            }}
          >
            <Component isActive={isActive} />
            <div className="text-xs opacity-50">{menuItem.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
