import React from 'react';
import { Outlet } from 'react-router';

const NoBottomAndFooterLayout: React.FC = ({}) => {
  return (
    <div className={'flex flex-col w-full h-full relative'}>
      <Outlet />
    </div>
  );
};

export default NoBottomAndFooterLayout;
