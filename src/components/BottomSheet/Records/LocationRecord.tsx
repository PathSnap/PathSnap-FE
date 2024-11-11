import React from 'react';

import IconCar from '../../../icons/BottomSheeet/IconCar';
import RecordWrapper from './RecordWrapper';

const LocationRecord: React.FC = () => {
  return (
    <RecordWrapper className={'shadow-l flex p-[14px] gap-5'}>
      <div className={'flex flex-col py-1.5 text-third justify-between w-full'}>
        <div className={'font-semibold'}>전주로 이동</div>
        <div
          className={
            'text-sm grid grid-cols-[13px_minmax(0,1fr)] grid-rows-2 gap-x-1.5 gap-y-[18px]'
          }
        >
          <div className={'row-span-2 self-center'}>
            <div className={'w-2 h-2 rounded-full bg-[#FF936B]'}></div>
            <div className="w-[5px] h-[30px] border-r-2 border-dashed border-[#D6D6D6] "></div>
            <div className={'w-2 h-2 rounded-full bg-[#77CEBD]'}></div>
          </div>
          <div>부천시 | 7:30</div>
          <div>강원도 | 15:30</div>
        </div>
        <div className={'text-sm flex gap-2.5 items-center'}>
          <IconCar />
          <div>26분 | 3.5km</div>
        </div>
      </div>
      <div className={'w-full rounded-2xl border-2 border-gray-200'}>
        지도자리..
      </div>
    </RecordWrapper>
  );
};

export default LocationRecord;