import React, { useState } from 'react';
import IconHome from '../icons/Footer/IconHome';
import IconPerson from '../icons/Footer/IconPerson';

interface MenuItem {
  component: React.FC<{ isActive: boolean }>;
  text: string;
}

const Footer: React.FC = () => {
  const menuItems: MenuItem[] = [
    { component: IconHome, text: '홈' },
    { component: IconPerson, text: '프로필' },
  ];

  const [selectedFooterIndex, setSelectedFooterIndex] = useState<number>(0);

  return (
    <div className="footer-wrapper" style={{ zIndex: 1000, position: 'relative' }}>
      <div className="max-w-[500px] w-full fixed h-20 bottom-0 flex justify-around items-center shadow-xs rounded-t-2xl ">
        <div
          className={
            'absolute bg-primary w-[68px] h-[68px] rounded-full bottom-[42px]'
          }
        ></div>

        {menuItems.map((menuItem, menuIndex) => {
          const Component = menuItem.component;
          return (
            <div
              key={menuIndex}
              className="flex flex-col justify-center items-center gap-1.5 "
              onClick={() => setSelectedFooterIndex(menuIndex)}
            >
              <Component isActive={menuIndex === selectedFooterIndex} />
              <div className="text-xs opacity-50">{menuItem.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
