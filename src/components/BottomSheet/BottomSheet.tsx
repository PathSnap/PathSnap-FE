import React, { useEffect, useState } from 'react';
import { BOTTOM_SHEET_HEIGHT, MAX_Y } from '../../utils/BottomSheetOption';
import { useBottomSheet } from '../../hooks/BottomSheet/useBottomSheet';
import PhotoRecord from './Records/PhotoRecord';
import SelectBox from './SelectBox';
import useRecordStore from '../../stores/RecordStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';
import useModalStore from '../../stores/Modals/ModalStore';
import LocationRecord from './Records/LocationRecord';
import { useNavigate } from 'react-router';
import IconMenu from '../../icons/BottomSheeet/IconMenu';
import IconEdit from '../../icons/BottomSheeet/IconEdit';
import IconTrash from '../../icons/BottomSheeet/IconTrash';
import useEditRecordStore from '../../stores/EditRecordStore';
import IconClose from '../../icons/IconClose';
import Dropdown from './Dropdown';
import useFriendStore, { Friend } from '../../stores/FriendStore';
import _ from 'lodash';

const BottomSheet2: React.FC = () => {
  const { sheetRef, headerRef, isBottomSheetOpen } = useBottomSheet();
  const { currentState, setState } = useEditRecordStore();
  const { searchRecord } = useRecordStore();

  useEffect(() => {
    searchRecord();
  }, []);

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
  const { record, recordDate } = useRecordStore((state) => state);

  const selectedBoxIndex = record.group ? 1 : 0;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const handleClickMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const { currentState } = useEditRecordStore();
  const [title, setTitle] = useState<string>(record.recordName);
  const [travelDate, setTravelDate] = useState<string>(recordDate);
  const { setState } = useEditRecordStore();

  useEffect(() => {
    setTitle(record.recordName);
    setTravelDate(recordDate);
  }, [record, recordDate]);

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
    <div className={'flex flex-col w-full gap-5 px-[22px] pb-5 text-second'}>
      <SelectBox
        leftText="내 기록"
        rightText="단체"
        selectedBoxIndex={selectedBoxIndex}
      />
      {/* 여행 제목 */}
      <div
        className={'flex justify-between h-[60px] items-center gap-10 relative'}
      >
        <div
          className={`relative w-full font-semibold text-2xl py-1 border-b ${
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
            className="right-0 top-full"
          />
        )}
      </div>
      {/* 여행 일자 */}
      <div className={'grid grid-cols-[60px_auto] items-center gap-6'}>
        <div className={'font-semibold flex-shrink-0'}>여행 일자</div>
        <div
          className={`relative w-full py-1 border-b text-end ${
            currentState === 'EDIT' ? ' border-second' : 'border-white'
          }`}
        >
          {currentState === 'EDIT' ? (
            <>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full h-full focus:outline-none text-end pr-8"
              />
              <IconClose
                className={'absolute right-0 top-1/4 -translate-y-1'}
                onClick={() => setTravelDate('')}
              />
            </>
          ) : (
            travelDate
          )}
        </div>
      </div>
    </div>
  );
};

const PeopleWithTravel: React.FC = () => {
  const { friends, leader } = useFriendStore();
  const { currentState } = useEditRecordStore();
  const [copyFriends, setCopyFriends] = useState<Friend[]>([]);

  useEffect(() => {
    setCopyFriends(_.cloneDeep(friends));
  }, [friends]);

  const handleClickDelete = (profileId: string) => {
    setCopyFriends((prev) =>
      prev.filter((friend) => friend.friendId !== profileId)
    );
  };
  return (
    <div className={'pb-5 w-screen pl-[10px]'}>
      <div className={'font-semibold text-second'}>함께 여행한 사람들</div>
      <div
        className={
          'flex gap-x-[18px] overflow-x-auto justify-start items-center w-full pt-[14px]'
        }
      >
        <AddPerson />
        {/* 리더 프로필 */}
        <Profile
          info={{ ...leader, name: leader.userName, friendId: leader.userId }}
          isLeader={true}
        />
        {/* 프로필들 나열될 부분 */}

        {currentState === 'EDIT'
          ? copyFriends.map((friend) => (
              <div className={'relative last:mr-[22px]'} key={friend.friendId}>
                <Profile
                  info={friend}
                  isLeader={false}
                  setCopyFriends={setCopyFriends}
                />
                {/* 프로필 삭제 아이콘 */}
                <div
                  onClick={() => {
                    handleClickDelete(friend.friendId);
                  }}
                  className={
                    'absolute w-4 aspect-square grid place-items-center bg-[#AFD8D7] rounded-full right-0 top-0 shadow-xxs'
                  }
                >
                  <div className={'w-2 h-0.5 rounded-full bg-white'}></div>
                </div>
              </div>
            ))
          : friends.map((friend) => (
              <div className={'relative last:mr-[22px]'} key={friend.friendId}>
                <Profile
                  key={friend.friendId}
                  info={friend}
                  isLeader={false}
                  setCopyFriends={setCopyFriends}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

//  단체 기록일때 함께 여행한 사람들을 나타내는 컴포넌트
interface ProfileProps {
  info: Friend;
  isLeader: boolean;
  setCopyFriends?: React.Dispatch<React.SetStateAction<Friend[]>>;
}
const Profile: React.FC<ProfileProps> = ({ info, isLeader }) => {
  return (
    <div
      className={
        'flex flex-col items-center flex-shrink-0 relative gap-2 min-w-14'
      }
    >
      <img
        src={info.url || ''}
        className={'w-14 rounded-full aspect-square object-cover'}
      />
      <div className={'text-sm text-second'}>
        {info.name}
        {isLeader && <span> | 리더</span>}
      </div>
      {/* 리더라면 강조표시 */}
      {isLeader && (
        <div className="absolute rounded-full w-[64px] aspect-square border-2 -translate-y-1 border-primary"></div>
      )}
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
  const isGroupRecord = useRecordStore((state) => state.record.group);
  const { searchFriendsAtRecord } = useFriendStore();
  const { recordId } = useRecordStore();

  useEffect(() => {
    if (isGroupRecord) {
      searchFriendsAtRecord(recordId);
    }
  }, [isGroupRecord]);
  return (
    <div className={'h-full px-3 overflow-y-auto overflow-x-hidden'}>
      {isGroupRecord ? <PeopleWithTravel /> : null}
      {children}
    </div>
  );
};

const Content: React.FC = () => {
  const { record } = useRecordStore((state) => state);
  const mergedRecords = [
    ...(record.photoRecords || []),
    ...(record.routeRecords || []),
  ].sort((a, b) => a.seq - b.seq);

  return (
    <div className={'px-[10px] flex flex-col gap-5 pb-10'}>
      {mergedRecords.map((record) =>
        'photoId' in record ? (
          // 사진 기록인 경우
          <PhotoRecord
            key={record.photoId}
            isPhotoRecord={true}
            record={record}
          />
        ) : (
          <LocationRecord
            key={record.routeId}
            isPhotoRecord={false}
            record={record}
          />
        )
      )}
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
