import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const BottomAndFooterLayout: React.FC = ({}) => {
  return (
    // 푸터 높이 빼줌
    <div className={'flex flex-col w-full h-[calc(100%-80px)] relative'}>
      {/* BASE */}
      <div className={'flex-grow'}>
        <Outlet />
      </div>
      <BottomSheet />
      <Footer />
    </div>
  );
};

export default BottomAndFooterLayout;
