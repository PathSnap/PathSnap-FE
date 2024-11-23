import React, { useState } from 'react';
import { BOTTOM_SHEET_HEIGHT, MAX_Y } from '../../utils/BottomSheetOption';
import { useBottomSheet } from '../../hooks/BottomSheet/useBottomSheet';
import PhotoRecord from './Records/PhotoRecord';
import SelectBox from './SelectBox';
import useRecordStore from '../../stores/RecordStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';
import useModalStore from '../../stores/ModalStore';
import LocationRecord from './Records/LocationRecord';
import { useNavigate } from 'react-router';
import IconMenu from '../../icons/BottomSheeet/IconMenu';
import IconEdit from '../../icons/BottomSheeet/IconEdit';
import IconTrash from '../../icons/BottomSheeet/IconTrash';
import useEditRecordStore from '../../stores/EditRecordStore';
import IconClose from '../../icons/IconClose';
import Dropdown from './Dropdown';

const BottomSheet2: React.FC = () => {
  const { sheetRef, headerRef, isBottomSheetOpen } = useBottomSheet();
  const { currentState, setState } = useEditRecordStore();
  return (
    <>
      <div
        style={{ height: BOTTOM_SHEET_HEIGHT, top: MAX_Y }}
        className={`flex flex-col fixed  bg-white transition-transform duration-150 ease-out rounded-t-3xl shadow-m z-40 max-w-[500px] w-full`}
        ref={sheetRef}
      >
        <BottomSheetHeader headerRef={headerRef} />
        <ContentHeader />
        <ContentWrapper>
          <Content />
        </ContentWrapper>
      </div>
      {currentState === 'EDIT' && isBottomSheetOpen && (
        <div
          className={
            'absolute -bottom-20 h-[110px] px-[22px] bg-white pt-4 w-full z-[60] shadow-xs'
          }
        >
          <button
            className={'is-active-green-button w-full h-[58px] text-lg'}
            onClick={() => setState('NONE')}
          >
            완료
          </button>
        </div>
      )}
    </>
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
  const { isGroupRecord } = useRecordStore();
  const selectedBoxIndex = isGroupRecord ? 1 : 0;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleClickMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const { currentState } = useEditRecordStore();
  const [title, setTitle] = useState<string>('여행 제목 없음');
  const { setState } = useEditRecordStore();

  // 드롭다운을 위한 아이템들
  const dropdownItems = [
    {
      name: '수정',
      onClick: () => {
        setState('EDIT');
        setIsDropdownOpen(false);
      },
      component: IconEdit,
    },
    {
      name: '여행 삭제',
      onClick: () => {
        setState('DELETE');
        setIsDropdownOpen(false);
      },
      component: IconTrash,
    },
  ];

  return (
    <div className={'flex flex-col w-full gap-5 px-[22px] pb-5'}>
      <SelectBox
        leftText="내 기록"
        rightText="단체"
        selectedBoxIndex={selectedBoxIndex}
      />
      <div
        className={'flex justify-between h-[60px] items-center gap-10 relative'}
      >
        <div
          className={`relative w-full text-second font-semibold text-2xl py-1 border-b ${
            currentState === 'EDIT' ? ' border-second' : 'border-white'
          }`}
        >
          {currentState === 'EDIT' ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-full focus:outline-none pr-6"
              />
              <IconClose
                className={'absolute right-0 top-1/4'}
                onClick={() => setTitle('')}
              />
            </>
          ) : (
            title
          )}
        </div>
        <IconMenu width={10} height={24} onClick={handleClickMenu} />
        {isDropdownOpen && (
          <Dropdown
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownItems={dropdownItems}
          />
        )}
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
  const { currentState } = useEditRecordStore();
  return (
    <div
      className={
        'flex flex-col items-center flex-shrink-0 relative gap-2 last:mr-[22px]'
      }
    >
      <img src={photoSrc} className={'w-14 rounded-full aspect-square '} />
      <div className={'text-sm text-second'}>
        {name}
        {isLeader && <span> | 리더</span>}
      </div>
      {/* 리더라면 강조표시 */}
      {isLeader && (
        <div className="absolute rounded-full w-[60px] aspect-square border-2 -translate-y-0.5 border-primary"></div>
      )}
      {currentState === 'EDIT' && (
        <div
          className={
            'absolute w-4 aspect-square grid place-items-center bg-[#AFD8D7] rounded-full right-0 top-0'
          }
        >
          <div className={'w-2 h-0.5 rounded-full bg-white'}></div>
        </div>
      )}
    </div>
  );
};

const PeopleWithTravel: React.FC = () => {
  return (
    <div className={'pb-5 w-screen pl-[10px]'}>
      <div className={'font-semibold text-second'}>함께 여행한 사람들</div>
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
    <div className={'h-full px-3 overflow-y-auto overflow-x-hidden'}>
      {isGroupRecord ? <PeopleWithTravel /> : null}
      {children}
    </div>
  );
};

const Content: React.FC = () => {
  return (
    <div className={'px-[10px] flex flex-col gap-5 pb-10'}>
      <PhotoRecord isPhotoRecord={true} />
      <PhotoRecord isPhotoRecord={true} />
      <PhotoRecord isPhotoRecord={true} />
      <LocationRecord isPhotoRecord={false} />
      <AddPhoto />
    </div>
  );
};

const AddPhoto: React.FC = () => {
  const { openModal } = useModalStore();
  return (
    <div
      className={
        'w-full h-[170px] rounded-2xl relative flex-shrink-0 shadow-l flex flex-col justify-center items-center gap-[14px] '
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
    </div>
  );
};
