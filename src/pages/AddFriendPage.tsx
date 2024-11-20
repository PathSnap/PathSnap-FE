import React, { useState } from 'react';
import IconClose from '../icons/IconClose';
import IconPlus from '../icons/BottomSheeet/IconPlus';
import { useNavigate } from 'react-router';

const AddFriend: React.FC = () => {
  return (
    <>
      <div className="flex-grow flex flex-col gap-[30px] text-second items-center px-[30px] py-5">
        <Header />
        <FriendsList />
        <SearchBar />
        <PersonList />
      </div>
      {/* 버튼 */}
      <div className={'w-full py-10 px-[30px] flex gap-4 font-semibold'}>
        <Buttons />
      </div>
    </>
  );
};

export default AddFriend;

const Header: React.FC = () => {
  return (
    <div className={'flex justify-between w-full font-semibold text-lg'}>
      <div className={'invisible'}>123명</div>
      <div className="">친구추가</div>
      <div>123명</div>
    </div>
  );
};

const FriendsList: React.FC = () => {
  return (
    <div
      className={
        'overflow-x-auto h-[74px] flex gap-3 relative justify-start w-full pt-1 flex-shrink-0'
      }
    >
      <Profile photoSrc="/icons/apple-icon-180.png" name="이희연" />
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

const SearchBar: React.FC = () => {
  return (
    <div className={'w-full relative h-fit'}>
      <input
        className={
          'w-full h-14 rounded-full border border-[#E5E5E5] focus:outline-primary pl-5 pr-[60px] text-lg'
        }
        placeholder="이름 검색"
      />

      <IconClose onClick={() => {}} className="absolute right-5 top-[18px]" />
    </div>
  );
};

const PersonList: React.FC = () => {
  return (
    <div className={'w-full flex flex-col gap'}>
      <Person
        photoSrc="/icons/apple-icon-180.png"
        name="이희연"
        phoneNum="010-1111-1111"
      />
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
      <div className={'flex flex-col py-2 justify-between flex-grow '}>
        <div className={'text-sm '}>{name}</div>
        <div className={'text-xs '}>{phoneNum}</div>
      </div>
      <IconPlus width={13.33} height={13.33} />
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
        className={'w-full h-[58px] bg-[#E5E5E5] rounded-2xl text-[#919191]'}
      >
        취소
      </button>
      <button
        className={`w-full h-[58px] bg-primary rounded-2xl text-white ${isActive ? '' : 'text-opacity-50'}`}
      >
        저장
      </button>
    </>
  );
};
