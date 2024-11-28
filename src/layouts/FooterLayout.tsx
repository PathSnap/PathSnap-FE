import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const FooterLayout: React.FC = () => {
  return (
    <div className={'flex flex-col w-full h-[calc(100%-80px)] relative'}>
      <div className={'flex-grow'}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default FooterLayout;
