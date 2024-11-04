import React, { ReactNode, useState } from 'react';
import SelectBox from './SelectBox';
import IconDrag from '../../icons/BottomSheeet/IconDrag';
import IconCar from '../../icons/BottomSheeet/IconCar';
import IconPlus from '../../icons/BottomSheeet/IconPlus';

const BottomSheet: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<Boolean>(false);
  const handleBottomSheet = (): void => {
    setIsBottomSheetOpen((prev) => !prev);
  };
  return (
    <div
      className={`w-full bg-white absolute rounded-t-3xl max-w-[500px] shadow-m z-50 transition-all duration-300 ${
        isBottomSheetOpen
          ? 'top-[53px] h-[calc(100%-53px)]'
          : 'top-[calc(100%-62px)] h-[62px]'
      }`}
    >
      <Header handleBottomSheet={handleBottomSheet} />
      {isBottomSheetOpen && <ContentWrapper />}
    </div>
  );
};
export default BottomSheet;

interface HeaderProps {
  handleBottomSheet: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleBottomSheet }) => {
  return (
    <div
      onClick={() => handleBottomSheet()}
      className={'h-[62px] pt-2.5 flex justify-center'}
    >
      <div className={'bg-[#D1D1D6] h-1.5 w-9 rounded-[9px]'}></div>
    </div>
  );
};

const ContentWrapper: React.FC = () => {
  return (
    <div
      className={'px-[22px] flex flex-col gap-5 justify-center items-center'}
    >
      <ContentHeader />
      <Content />
    </div>
  );
};

const ContentHeader: React.FC = () => {
  return (
    <div className={'flex justify-between items-center w-full'}>
      <div className={'text-second font-semibold text-2xl'}>여행 제목 없음</div>
      <SelectBox leftText="내 기록" rightText="단체" />
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <div className={'flex flex-col gap-[14px] w-full'}>
      <div className={'text-second font-semibold w-full text-left'}>기록</div>
      <PhotoRecord />
      <LocationRecord />
      <AddPhoto />
    </div>
  );
};

interface RecordWrapperProps {
  children: ReactNode;
  className?: string;
}
const RecordWrapper: React.FC<RecordWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`w-full h-[170px] rounded-2xl relative ${className}`}>
      {children}
    </div>
  );
};

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
            <div className={'w-2 h-2 rounded-full bg-[#D6D6D6]'}></div>
            <div className="w-[5px] h-[30px] border-r-2 border-dashed border-[#D6D6D6] "></div>
            <div className={'w-2 h-2 rounded-full bg-[#D6D6D6]'}></div>
          </div>
          <div>부천시 | 7:30</div>
          <div>강원도 | 15:30</div>
        </div>
        <div className={'text-sm flex gap-2.5 items-center'}>
          <IconCar />
          <div>26분 | 3.5km</div>
        </div>
      </div>
      <div className={'w-full rounded-2xl'}>
        <img src="/icons/apple-icon-180.png" className={'w-full h-full'} />
      </div>
    </RecordWrapper>
  );
};

const AddPhoto: React.FC = () => {
  return (
    <RecordWrapper
      className={
        'shadow-l flex flex-col justify-center items-center gap-[14px]'
      }
    >
      <div
        className={
          'w-[68px] h-[68px] rounded-full shadow-xxs grid place-items-center'
        }
      >
        <IconPlus width={22} height={22} />
      </div>
      <div className={'font-semibold text-[#D6D6D6] text-sm'}>
        사진 추가하기
      </div>
    </RecordWrapper>
  );
};
