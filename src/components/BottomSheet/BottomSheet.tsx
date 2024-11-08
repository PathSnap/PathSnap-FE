import React, { ReactNode } from 'react';
import SelectBox from './SelectBox';

import IconPlus from '../../icons/BottomSheeet/IconPlus';
import {
  BOTTOM_SHEET_HEADER_HEIGHT,
  BOTTOM_SHEET_HEIGHT,
  FOOTER_HEIGHT,
} from '../../utils/BottomSheetOption';
import useBottomSheet from '../../hooks/BottomSheet/useBottomSheet';
import RecordWrapper from './Records/RecordWrapper';
import PhotoRecord from './Records/PhotoRecord';
import LocationRecord from './Records/LocationRecord';

const BottomSheet: React.FC = () => {
  const { sheet } = useBottomSheet();
  return (
    <div
      ref={sheet}
      className={`min-h-full flex-grow flex flex-col top-[calc(100%-62px-80px)] w-full bg-white  fixed max-w-[500px] rounded-t-3xl shadow-m z-50 `}
    >
      <Header />
      <ContentWrapper>
        <ContentHeader />
        <Content />
      </ContentWrapper>
    </div>
  );
};
export default BottomSheet;

const Header: React.FC = () => {
  return (
    <div className={'h-[62px] pt-2.5 flex justify-center'}>
      <div className={'bg-[#D1D1D6] h-1.5 w-9 rounded-[9px]'}></div>
    </div>
  );
};

interface ContentWrapperProps {
  children: ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div
      className={'px-[18px] flex flex-col gap-5 justify-center items-center '}
    >
      {children}
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
  const { content } = useBottomSheet();
  const contentHeight =
    BOTTOM_SHEET_HEIGHT - BOTTOM_SHEET_HEADER_HEIGHT - 52 - 20 - FOOTER_HEIGHT;

  return (
    <div
      ref={content}
      className={`flex flex-col gap-[14px] w-full overflow-y-auto pb-5 px-1`}
      style={{ height: contentHeight }}
    >
      <div className={'text-second font-semibold w-full text-left'}>기록</div>
      <PhotoRecord />
      <LocationRecord />
      <LocationRecord />
      <LocationRecord />
      <AddPhoto />
    </div>
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
