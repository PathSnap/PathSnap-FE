import React from 'react';
import BottomSheet from '../components/BottomSheet/BottomSheet';
import Footer from '../components/Footer';

interface BottomAndFooterLayoutProps {
  children: React.ReactNode;
}

const BottomAndFooterLayout: React.FC<BottomAndFooterLayoutProps> = ({
  children,
}) => {
  return (
    // 푸터 높이 빼줌
    <div className={'flex flex-col w-full h-[calc(100%-80px)] relative'}>
      {/* BASE */}
      <div className={'flex-grow'}>{children}</div>
      <BottomSheet />
      <Footer />
    </div>
  );
};

export default BottomAndFooterLayout;
