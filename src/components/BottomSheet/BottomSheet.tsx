import React, { ReactNode, useState } from 'react';
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
import useRecordStore from '../../stores/RecordStore';

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
  const { isGroupRecord, setIsGroupRecord } = useRecordStore();
  const selectedBoxIndex = isGroupRecord ? 1 : 0;

  return (
    <div className={'flex flex-col w-full gap-5'}>
      <div className={'flex justify-between items-center w-full'}>
        <div className={'text-second font-semibold text-2xl'}>
          여행 제목 없음
        </div>
        <SelectBox
          leftText="내 기록"
          rightText="단체"
          selectedBoxIndex={selectedBoxIndex}
          setSelectedBoxIndex={setIsGroupRecord}
        />
      </div>
    </div>
  );
};

//  단체 기록일때 함께 여행한 사람들을 나타내는 컴포넌트
interface ProfileProps {
  photoSrc?: string;
  name: string;
  isLeader: boolean;
}
const Profile: React.FC<ProfileProps> = ({
  photoSrc = '/icons/apple-icon-180.png',
  name,
  isLeader,
}) => {
  return (
    <div className={'flex flex-col items-center flex-shrink-0 relative gap-2'}>
      <img src={photoSrc} className={'w-14 rounded-full aspect-square'} />
      <div className={'text-sm text-second'}>{name}</div>
      {isLeader && (
        <div className="absolute rounded-full w-[60px] aspect-square border-2 -translate-y-0.5 border-primary"></div>
      )}
    </div>
  );
};

const PeopleWithTravel: React.FC = () => {
  return (
    <div>
      <div className={'font-semibold text-second'}>함께 여행한 사람들</div>
      <div
        className={
          'flex gap-x-[18px] overflow-x-auto justify-start items-center w-full pt-[14px]'
        }
      >
        {/* 사람 추가 */}
        <div
          className={'flex flex-col items-center overflow-visible gap-2 px-1'}
        >
          <div
            className={
              'w-14 aspect-square rounded-full grid place-items-center shadow-xxs p-1'
            }
          >
            <IconPlus width={16} height={16} />
          </div>
          <div className={'text-second text-opacity-50 text-sm'}>추가</div>
        </div>
        {/* 프로필들 나열될 부분 */}
        <Profile name="김람운" isLeader={true} />
        <Profile name="이희연" isLeader={false} />
      </div>
    </div>
  );
};

const Content: React.FC = () => {
  const { content } = useBottomSheet();
  const contentHeight =
    BOTTOM_SHEET_HEIGHT - BOTTOM_SHEET_HEADER_HEIGHT - 52 - 20 - FOOTER_HEIGHT;
  const { isGroupRecord } = useRecordStore();

  return (
    <div
      ref={content}
      className={`flex flex-col gap-[14px] w-full overflow-y-auto pb-5 px-1`}
      style={{ height: contentHeight }}
    >
      {isGroupRecord ? <PeopleWithTravel /> : null}
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
