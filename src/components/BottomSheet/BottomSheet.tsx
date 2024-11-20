import React from 'react';
import { BOTTOM_SHEET_HEIGHT, MAX_Y } from '../../utils/BottomSheetOption';
import { useBottomSheet2 } from '../../hooks/BottomSheet/useBottomSheet';
import PhotoRecord from './Records/PhotoRecord';
import SelectBox from './SelectBox';
import useRecordStore from '../../stores/RecordStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';
import useModalStore from '../../stores/ModalStore';
import RecordWrapper from './Records/RecordWrapper';
import LocationRecord from './Records/LocationRecord';
import { useNavigate } from 'react-router';

const BottomSheet2: React.FC = () => {
  const { sheetRef, headerRef } = useBottomSheet2();
  return (
    <div
      style={{ height: BOTTOM_SHEET_HEIGHT, top: MAX_Y }}
      className={`flex flex-col fixed  bg-white transition-transform duration-150 ease-out rounded-t-3xl shadow-m z-50 max-w-[500px] w-full`}
      ref={sheetRef}
    >
      <BottomSheetHeader headerRef={headerRef} />
      <ContentHeader />
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </div>
  );
};

export default BottomSheet2;

interface BottomSheetHeaderProps {
  headerRef: React.RefObject<HTMLDivElement>;
}

const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ headerRef }) => {
  return (
    <div
      ref={headerRef}
      className={'h-[62px] pt-2.5 flex justify-center flex-shrink-0'}
    >
      <div className={'bg-[#D1D1D6] h-1.5 w-9 rounded-[9px]'}></div>
    </div>
  );
};

const ContentHeader: React.FC = () => {
  const { isGroupRecord, setIsGroupRecord } = useRecordStore();
  const selectedBoxIndex = isGroupRecord ? 1 : 0;

  return (
    <div
      className={
        'flex justify-between items-center w-full gap-5 px-[22px] pb-5'
      }
    >
      <div className={'text-second font-semibold text-2xl'}>여행 제목 없음</div>
      <SelectBox
        leftText="내 기록"
        rightText="단체"
        selectedBoxIndex={selectedBoxIndex}
        setSelectedBoxIndex={setIsGroupRecord}
      />
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
    <div
      className={
        'flex flex-col items-center flex-shrink-0 relative gap-2 last:pr-[22px]'
      }
    >
      <img src={photoSrc} className={'w-14 rounded-full aspect-square'} />
      <div className={'text-sm text-second'}>{name}</div>
      {/* 리더라면 강조표시 */}
      {isLeader && (
        <div className="absolute rounded-full w-[60px] aspect-square border-2 -translate-y-0.5 border-primary"></div>
      )}
    </div>
  );
};

const PeopleWithTravel: React.FC = () => {
  return (
    <div className={'pb-5 w-screen pl-[10px]'}>
      <div className={'font-semibold text-second '}>함께 여행한 사람들</div>
      <div
        className={
          'flex gap-x-[18px] overflow-x-auto justify-start items-center w-full pt-[14px]'
        }
      >
        <AddPerson />
        {/* 프로필들 나열될 부분 */}
        <Profile name="김람운" isLeader={true} />

        {[0, 1, 2, 3, 4, 5].map((item) => {
          return <Profile name="이희연" isLeader={false} key={item} />;
        })}
      </div>
    </div>
  );
};

const AddPerson = () => {
  const router = useNavigate();
  const moveToAddPersonPage = () => {
    router('/add');
  };
  return (
    <div className={'flex flex-col items-center overflow-visible gap-2 px-1'}>
      <div
        onClick={() => {
          moveToAddPersonPage();
        }}
        className={
          'w-14 aspect-square rounded-full grid place-items-center shadow-xxs p-1'
        }
      >
        <IconPlus width={16} height={16} />
      </div>
      <div className={'text-second text-opacity-50 text-sm'}>추가</div>
    </div>
  );
};

interface ContentWrapperProps {
  children?: React.ReactNode;
}
const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const isGroupRecord = useRecordStore((state) => state.isGroupRecord);
  return (
    <div className={'h-full px-3 overflow-y-auto '}>
      {isGroupRecord ? <PeopleWithTravel /> : null}
      {children}
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <div className={'px-[10px] flex flex-col gap-5 pb-5'}>
      <PhotoRecord />
      <PhotoRecord />
      <PhotoRecord />
      <LocationRecord />
      <AddPhoto />
    </div>
  );
};

const AddPhoto: React.FC = () => {
  const { openModal } = useModalStore();
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
        onClick={() => {
          openModal('addPhotoModal');
        }}
      >
        <IconPlus width={22} height={22} />
      </div>
      <div className={'font-semibold text-[#D6D6D6] text-sm'}>
        사진 추가하기
      </div>
    </RecordWrapper>
  );
};
