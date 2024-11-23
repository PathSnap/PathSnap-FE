import React, { useState } from 'react';
import IconHome from '../icons/Footer/IconHome';
import IconPerson from '../icons/Footer/IconPerson';
import { useLocation, useNavigate } from 'react-router';
import IconRecord from '../icons/Footer/IconRecord';

interface MenuItem {
  component: React.FC<{ isActive: boolean }>;
  text: string;
  onClick: () => void;
}

const Footer: React.FC = () => {
  const router = useNavigate();
  const location = useLocation();

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

  const [isRecording, setIsRecording] = useState<boolean>(false);
  return (
    <div className="max-w-[500px] w-full fixed h-20 bottom-0 flex justify-around items-center shadow-xs rounded-t-2xl z-50 bg-white">
      <div
        onClick={() => setIsRecording(!isRecording)}
        className={
          'absolute bg-primary w-[68px] h-[68px] rounded-full bottom-[42px] z-40 grid place-items-center'
        }
      >
        <IconRecord isRecording={isRecording} />
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
