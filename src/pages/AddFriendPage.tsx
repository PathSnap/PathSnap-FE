import React, { useEffect, useState } from 'react';
import IconClose from '../icons/IconClose';
import IconPlus from '../icons/BottomSheeet/IconPlus';
import { useNavigate } from 'react-router';
import useFriendStore, { Friend } from '../stores/FriendStore';
import _ from 'lodash';

interface addFriend {
  friendId: string;
  name: string;
  url: string;
  imageId: string;
}

const AddFriend: React.FC = () => {
  const { friends } = useFriendStore();
  const [addFriends, setAddFriends] = useState<addFriend[]>([...friends]);
  const [friendsNum, setFriendsNum] = useState(addFriends.length);

  useEffect(() => {
    setAddFriends(_.cloneDeep(friends));
  }, [friends]);

  useEffect(() => {}, [addFriends]);
  return (
    <>
      <div className="flex-grow flex flex-col gap-[30px] text-second items-center px-[30px] py-5">
        <Header friendsNum={friendsNum} />
        <FriendsList addFriends={addFriends} />
        <SearchBar addFriends={addFriends} />
        <PersonList />
      </div>
      {/* 버튼 */}
      <div className={'w-full py-10 px-[30px] flex gap-4 text-lg'}>
        <Buttons />
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
  addFriends: addFriend[];
}
// 추가될 친구 목록
const FriendsList: React.FC<FriendsListProps> = ({ addFriends }) => {
  return (
    <div
      className={
        'overflow-x-auto h-[74px] flex gap-3 relative justify-start w-full pt-1 flex-shrink-0'
      }
    >
      {addFriends.map((friend) => (
        <Profile
          key={friend.friendId}
          photoSrc={friend.url}
          name={friend.name}
        />
      ))}
    </div>
  );
};

interface ProfileProps {
  photoSrc?: string;
  name: string;
}
const Profile: React.FC<ProfileProps> = ({ photoSrc, name }) => {
  return (
    <div className={'flex flex-col justify-between items-center relative '}>
      <div
        className={
          'absolute w-4 aspect-square grid place-items-center bg-[#AFD8D7] rounded-full right-0 -top-1'
        }
      >
        <div className={'w-2 h-0.5 rounded-full bg-white'}></div>
      </div>
      <img src={photoSrc} className={'rounded-full w-12 aspect-square'} />
      <div className={'text-sm'}>{name}</div>
    </div>
  );
};

interface SearchBarProps {
  addFriends: addFriend[];
}
const SearchBar: React.FC<SearchBarProps> = ({ addFriends }) => {
  const { searchFriends, setSearchResults } = useFriendStore(); // 검색결과
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
          )
      );
      setSearchResults(filteredResults); // 필터링된 결과를 상태에 저장
    }
  };

  const debouncedFilterSearchResult = _.debounce(filterSearchResult, 300);

  // 검색어 변경 시 필터링 함수 호출
  useEffect(() => {
    debouncedFilterSearchResult(searchValue);
    return () => debouncedFilterSearchResult.cancel(); // cleanup
  }, [searchValue, addFriends]);
  return (
    <div className={'w-full relative h-fit'}>
      <input
        className={
          'w-full h-14 rounded-full border border-[#E5E5E5] focus:outline-primary pl-5 pr-[60px] text-lg'
        }
        placeholder="이름 검색"
        // TODO : API 추가되면 수정
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          // filterSearchResult(e.target.value);
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
// 검색된 친구 리스트
const PersonList: React.FC = () => {
  const { searchResults } = useFriendStore();
  return (
    <div className={'w-full flex flex-col gap'}>
      {searchResults.map((friend) => (
        <Person
          key={friend.imageId}
          photoSrc={friend.url}
          name={friend.name}
          phoneNum={friend.phoneNumber || '010-1111-1111'}
        />
      ))}
    </div>
  );
};

interface PersonProps {
  photoSrc?: string;
  name: string;
  phoneNum: string;
}

const Person: React.FC<PersonProps> = ({ photoSrc, name, phoneNum }) => {
  return (
    <div
      className={
        'w-full h-[72px] py-3 flex justify-between items-center gap-[10px] border-b border-[#D6DCE9] first:pt-0 last:border-none'
      }
    >
      <img src={photoSrc} className={'rounded-full w-12 aspect-square '} />
      <div className={'flex flex-col py-2 justify-between flex-grow gap-0.5'}>
        <div className={'text-sm '}>{name}</div>
        <div className={'text-xs '}>{phoneNum}</div>
      </div>
      <IconPlus width={13.33} height={13.33} onClick={() => {}} />
    </div>
  );
};

const Buttons = () => {
  const [isActive, _] = useState(false);
  const router = useNavigate();
  const handleClickCancel = () => {
    router('/');
  };
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
        className={`w-full h-[58px] ${isActive ? 'is-active-green-button' : 'non-active-green-button'}`}
      >
        저장
      </button>
    </>
  );
};
