import React, { useState } from 'react';
import IconArrow from '../icons/SerchPage/IconArrow';
import IconSearch from '../icons/SerchPage/IconSerch';
import IconTime from '../icons/SerchPage/IconTime';
import IconDelete from '../icons/SerchPage/IconDelete';
import { useNavigate } from 'react-router';

const SerchPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recent'); // 상태 추가

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow flex flex-col text-second items-center px-0 py-5">
        <SearchBar />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* 조건부 렌더링 */}
        {activeTab === 'recent' && <LocationList />}
        {activeTab === 'regional' && <SelectLocation />}
      </div>
      {/* 조건부 버튼 렌더링 */}
      {activeTab === 'regional' && (
        <div className="w-full py-10 px-0 flex gap-4 text-lg">
          <Buttons />
        </div>
      )}
    </div>
  );
};

export default SerchPage;

const SearchBar: React.FC = () => {
  return (
    <div className="w-[89%] relative h-14">
      <input
        className="w-full h-full rounded-full border border-[#E5E5E5] focus:outline-primary pl-12 pr-12 text-lg"
        placeholder="주소 입력"
      />
      <IconArrow
        direction="left"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
      />
      <IconSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

interface TabMenuProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const TabMenu: React.FC<TabMenuProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-full relative mt-[20px]">
      <div className="flex justify-center">
        <div className="flex w-[44%]">
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 text-center pb-2 ${
              activeTab === 'recent'
                ? 'text-[#595959] border-b-2 border-primary'
                : 'text-[#595959] text-opacity-60'
            }`}
          >
            최근
          </button>
        </div>
        <div className="flex w-[44%]">
          <button
            onClick={() => setActiveTab('regional')}
            className={`flex-1 text-center pb-2 ${
              activeTab === 'regional'
                ? 'text-[#595959] border-b-2 border-primary'
                : 'text-[#595959] text-opacity-60'
            }`}
          >
            지역별
          </button>
        </div>
      </div>
    </div>
  );
};

const LocationList: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <Location locationName="서울시 강남구" date="2021.09.01" />
      <Location locationName="서울시 종로구" date="2021.09.02" />
    </div>
  );
};

interface LocationProps {
  locationName: string;
  date: string;
}

const Location: React.FC<LocationProps> = ({ locationName, date }) => {
  return (
    <div className="w-full h-[64px] px-4 flex justify-between items-center border-t border-gray-200">
      <div className="flex items-center gap-3">
        <IconTime />
        <div className="text-sm text-[#595959]">{locationName}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-xs text-[#A5AAB4]">{date}</div>
        <IconDelete />
      </div>
    </div>
  );
};

const SelectLocation: React.FC = () => {
  const locationBlocks = Array.from(
    { length: 12 },
    (_, index) => `Location ${index + 1}`
  );

  return (
    <div className="w-full h-[451px] flex flex-col justify-start items-center border-t border-gray-200 px-4">
      <div className="flex flex-wrap justify-around items-center bg-[#77CEBD]/20 rounded-[20px] py-[12px] px-[40px] w-[95%] h-[15%] mt-[15px]">
        {/* 서울 */}
        <span className="text-[#595959]/100 text-[16px]">시·도</span>
        <IconArrow
          width={5.67}
          direction="right"
          className="mx-2 text-gray-400"
        />
        {/* 강남구 */}
        <span className="text-[#595959]/30 text-[16px]">시·군·구</span>
        <IconArrow
          width={5.67}
          direction="right"
          className="mx-2 text-gray-400"
        />
        {/* 동읍면 */}
        <span className="text-[#595959]/30 text-[16px]">동·읍·면</span>
      </div>
      <div className="grid grid-cols-3 h-[272px] w-[384px] mt-4">
        {locationBlocks.map((blockName, index) => (
          <LocationBlock key={index} locationBlockName={blockName} />
        ))}
      </div>
    </div>
  );
};

interface LocationBlockProps {
  locationBlockName: string;
}

const LocationBlock: React.FC<LocationBlockProps> = ({ locationBlockName }) => {
  return (
    <div className="flex justify-center items-center border border-[#000000]/4 bg-white h-[68px] W-[128px]">
      {locationBlockName}
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
        onClick={handleClickCancel}
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
