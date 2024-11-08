import React from 'react';
import RecordWrapper from './RecordWrapper';
import IconDrag from '../../../icons/BottomSheeet/IconDrag';

const PhotoRecord: React.FC = () => {
  return (
    <RecordWrapper>
      <div className={'w-full h-[170px] rounded-2xl relative'}>
        {/* 오버레이 */}
        <div
          className={
            'w-full h-full bg-black bg-opacity-15 absolute rounded-2xl'
          }
        ></div>
        <img
          src="/icons/apple-icon-180.png"
          className={'w-full h-full object-cover'}
        />
        {/* 이미지 위의 요소들 */}
        <div className={'absolute right-3 top-3'}>
          <IconDrag />
        </div>
        <div className={'absolute bottom-3 left-3 text-white text-xs'}>
          <div className={'font-bold'}>장소이름</div>
          <div>2024.11.03</div>
        </div>
      </div>
    </RecordWrapper>
  );
};

export default PhotoRecord;
