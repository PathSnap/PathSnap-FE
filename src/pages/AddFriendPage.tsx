import React, { useEffect, useState } from 'react';
import IconClose from '../icons/IconClose';
import IconPlus from '../icons/BottomSheeet/IconPlus';
import { useNavigate } from 'react-router';
import useFriendStore, { Friend } from '../stores/FriendStore';
import _ from 'lodash';
import { InitBottomSheet } from '../hooks/BottomSheet/InitBottomSheet';
import useRouteRecordStore from '../stores/RouteRecord';

const AddFriend: React.FC = () => {
  const [addFriends, setAddFriends] = useState<Friend[]>([]);
  const [friendsNum, setFriendsNum] = useState(addFriends.length);

  useEffect(() => {
    setFriendsNum(addFriends.length);
  }, [addFriends]);

  return (
    <>
      <div className="flex-grow flex flex-col gap-[30px] text-second items-center px-[30px] py-5">
        <Header friendsNum={friendsNum} />

        {addFriends.length > 0 && (
          <FriendsList addFriends={addFriends} setAddFriends={setAddFriends} />
        )}
        <SearchBar addFriends={addFriends} />
        <PersonList setAddFriends={setAddFriends} />
      </div>
      {/* 버튼 */}
      <div className={'w-full py-10 px-[30px] flex gap-4 text-lg'}>
        <Buttons addFriends={addFriends} />
      </div>
    </>
  );
};

export default AddFriend;

interface HeaderProps {
  friendsNum: number;
}

const Header: React.FC<HeaderProps> = ({ friendsNum }) => {
  return (
    <div className={'flex justify-between w-full font-semibold text-lg'}>
      <div className={'invisible'}>{friendsNum}명</div>
      <div className="">친구추가</div>
      <div>{friendsNum}명</div>
    </div>
  );
};

interface FriendsListProps {
  addFriends: Friend[];
  setAddFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
}
// 추가될 친구 목록
const FriendsList: React.FC<FriendsListProps> = ({
  addFriends,
  setAddFriends,
}) => {
  return (
    <div
      className={
        'overflow-x-auto h-[74px] flex gap-3 relative justify-start w-full pt-1 flex-shrink-0'
      }
    >
      {addFriends.map((friend) => (
        <Profile
          key={friend.imageId}
          info={friend}
          setAddFriends={setAddFriends}
        />
      ))}
    </div>
  );
};

interface ProfileProps {
  info: Friend;
  setAddFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
}

const Profile: React.FC<ProfileProps> = ({ info, setAddFriends }) => {
  return (
    <div className={'flex flex-col justify-between items-center relative'}>
      {/* 친구삭제버튼 */}
      <div
        onClick={() => {
          setAddFriends((prev) =>
            prev.filter((friend) => friend.imageId !== info.imageId)
          );
        }}
        className={
          'absolute w-4 aspect-square grid place-items-center bg-[#AFD8D7] rounded-full right-0 -top-1'
        }
      >
        <div className={'w-2 h-0.5 rounded-full bg-white'}></div>
      </div>
      <img
        src={info.url || ''}
        className={'rounded-full w-12 aspect-square object-cover'}
      />
      <div className={'text-sm'}>{info.name}</div>
    </div>
  );
};

interface SearchBarProps {
  addFriends: Friend[];
}
const SearchBar: React.FC<SearchBarProps> = ({ addFriends }) => {
  const { searchFriends, setSearchResults, friends } = useFriendStore(); // 검색결과
  const [searchValue, setSearchValue] = useState<string>('');

  const filterSearchResult = async (searchValue: string) => {
    // 검색창 비어있을 때
    if (!searchValue) {
      setSearchResults([]);
    } else {
      const results = await searchFriends(searchValue); // 검색어로 친구 목록 검색

      const filteredResults = results.filter(
        (friend: Friend) =>
          !addFriends.some(
            (addedFriend) => addedFriend.imageId === friend.imageId
          ) &&
          !friends.some(
            (existingFriend) => existingFriend.imageId === friend.imageId
          )
      );
      setSearchResults(filteredResults); // 필터링된 결과를 상태에 저장
    }
  };

  const debouncedFilterSearchResult = _.debounce(filterSearchResult, 300);

  // 검색어 변경 시 필터링 함수 호출
  useEffect(() => {
    debouncedFilterSearchResult(searchValue);
    return () => debouncedFilterSearchResult.cancel();
  }, [searchValue, addFriends]);

  return (
    <div className={'w-full relative h-fit'}>
      <input
        className={
          'w-full h-14 rounded-full border border-[#E5E5E5] focus:outline-primary pl-5 pr-[60px] text-lg'
        }
        placeholder="이름 검색"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <IconClose
        onClick={() => {
          setSearchValue('');
        }}
        className="absolute right-5 top-[18px]"
      />
    </div>
  );
};

interface PersonListProps {
  setAddFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
}
// 검색된 친구 리스트
const PersonList: React.FC<PersonListProps> = ({ setAddFriends }) => {
  const { searchResults } = useFriendStore();
  return (
    <div className={'w-full flex flex-col gap'}>
      {searchResults.map((friend) => (
        <Person
          key={friend.imageId}
          info={friend}
          setAddFriends={setAddFriends}
        />
      ))}
    </div>
  );
};

interface PersonProps {
  info: Friend;
  setAddFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
}

const Person: React.FC<PersonProps> = ({ info, setAddFriends }) => {
  return (
    <div
      className={
        'w-full h-[72px] py-3 flex justify-between items-center gap-[10px] border-b border-[#D6DCE9] first:pt-0 last:border-none'
      }
    >
      <img
        src={info.url || ''}
        className={'rounded-full w-12 aspect-square object-cover'}
      />
      <div className={'flex flex-col py-2 justify-between flex-grow gap-0.5'}>
        <div className={'text-sm '}>{info.name}</div>
        <div className={'text-xs '}>{info.phoneNumber}</div>
      </div>
      <IconPlus
        width={13.33}
        height={13.33}
        onClick={() => {
          setAddFriends((prev) => [...prev, info]);
        }}
      />
    </div>
  );
};

interface ButtonsProps {
  addFriends: Friend[];
}
const Buttons: React.FC<ButtonsProps> = ({ addFriends }) => {
  const { addFriend } = useFriendStore();
  const { recordingInfo } = useRouteRecordStore((state) => state);
  const [isActive, setIsActive] = useState(false);
  const router = useNavigate();
  const handleClickCancel = () => {
    router('/');
  };

  const handleClickSaveBtn = async () => {
    if (!isActive) return;
    try {
      const requests = addFriends.map((friend) => {
        addFriend(friend.friendId, recordingInfo.recordId);
      });

      await Promise.all(requests).then(() => {
        router('/');
        InitBottomSheet();
      });
    } catch (error) {
      console.error('요청 중 하나 이상 실패:', error);
    }
  };

  useEffect(() => {
    addFriends.length > 0 ? setIsActive(true) : setIsActive(false);
  }, [addFriends]);

  return (
    <>
      <button
        onClick={() => {
          handleClickCancel();
        }}
        className={'w-full h-[58px] gray-button'}
      >
        취소
      </button>
      <button
        onClick={() => {
          handleClickSaveBtn();
        }}
        className={`w-full h-[58px] ${isActive ? 'is-active-green-button' : 'non-active-green-button'}`}
      >
        저장
      </button>
    </>
  );
};
