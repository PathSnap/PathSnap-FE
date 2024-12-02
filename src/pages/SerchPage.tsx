import React, { useState } from 'react';
import IconArrow from '../icons/SerchPage/IconArrow';
import IconSearch from '../icons/SerchPage/IconSerch';
import IconTime from '../icons/SerchPage/IconTime';
import IconDelete from '../icons/SerchPage/IconDelete';
import { useNavigate } from 'react-router';
import { Locations } from '../data/LocationData';
import axios from 'axios';
import { useEffect, useRef } from 'react';

interface SelectLocationProps {
  selectedLocation: {
    '시·도': LocationsData;
    '시·군·구': LocationsData;
    '동·읍·면·리': LocationsData;
  };
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{
      '시·도': LocationsData;
      '시·군·구': LocationsData;
      '동·읍·면·리': LocationsData;
    }>
  >;
}

const SerchPage: React.FC = () => {
  const isFetched = useRef(false); // 요청 여부 추적

  useEffect(() => {
    const fetchData = async () => {
      if (isFetched.current) return; // 이미 요청이 실행되었다면 종료

      const baseUrl = import.meta.env.VITE_API_URL;
      try {
        const res = await axios.post(
          `${baseUrl}/reissue`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        isFetched.current = true; // 요청 상태를 업데이트
      }
    };

    fetchData();
  }, []); // 빈 의존성 배열로 한 번만 실행

  const [activeTab, setActiveTab] = useState('recent'); // 상태 추가
  const [selectedLocation, setSelectedLocation] = useState<{
    '시·도': LocationsData;
    '시·군·구': LocationsData;
    '동·읍·면·리': LocationsData;
  }>({
    '시·도': { name: '', x: 0, y: 0 },
    '시·군·구': { name: '', x: 0, y: 0 },
    '동·읍·면·리': { name: '', x: 0, y: 0 },
  });
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow flex flex-col text-second items-center px-0 py-5">
        <SearchBar />
        <TabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* 조건부 렌더링 */}
        {activeTab === 'recent' && <LocationList />}
        {activeTab === 'regional' && (
          <SelectLocation
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        )}
      </div>
      {/* 조건부 버튼 렌더링 */}
      {activeTab === 'regional' && (
        <div className="w-full py-10 px-0 flex gap-4 text-lg">
          <Buttons
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      )}
    </div>
  );
};

export default SerchPage;

const SearchBar: React.FC = () => {
  const router = useNavigate(); // useNavigate 훅으로 router 생성
  return (
    <div className="w-[89%] relative h-14">
      <input
        className="w-full h-full rounded-full border border-[#E5E5E5] focus:outline-primary pl-12 pr-12 text-lg"
        placeholder="주소 입력"
      />
      <IconArrow
        direction="left"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        onClick={() => {
          router('/'); // '/' 경로로 이동
        }}
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

interface LocationsData {
  name: string;
  x: number;
  y: number;
}

const SelectLocation: React.FC<SelectLocationProps> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [currentStep, setCurrentStep] = useState<
    '시·도' | '시·군·구' | '동·읍·면·리'
  >('시·도');

  const locationBlocks: LocationsData[] = (() => {
    if (currentStep === '시·도') {
      return Locations['시·도'];
    } else if (currentStep === '시·군·구' && selectedLocation['시·도'].name) {
      return Locations['시·군·구'][selectedLocation['시·도'].name] || [];
    } else if (
      currentStep === '동·읍·면·리' &&
      selectedLocation['시·군·구'].name
    ) {
      return Locations['동·읍·면·리'][selectedLocation['시·군·구'].name] || [];
    }
    return [];
  })();

  const handleLocationClick = (location: LocationsData) => {
    setSelectedLocation((prev) => ({
      ...prev,
      [currentStep]: {
        name: location.name,
        x: location.x,
        y: location.y,
      },
    }));

    if (currentStep === '시·도') {
      setCurrentStep('시·군·구');
    } else if (currentStep === '시·군·구') {
      setCurrentStep('동·읍·면·리');
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center border-t border-gray-200 px-4">
      <div className="flex flex-wrap justify-around items-center gap-1 bg-[#77CEBD]/20 rounded-[20px] py-[12px] px-[40px] w-[97%] h-[62px] mt-[37px]">
        <span
          className={`text-[16px] ${
            selectedLocation['시·도'].name
              ? 'text-[#595959]/100'
              : 'text-[#595959]/30'
          }  w-[80px] text-center whitespace-nowrap`}
          onClick={() => {
            setCurrentStep('시·도');
            selectedLocation['시·도'].name = '';
            selectedLocation['시·군·구'].name = '';
            selectedLocation['동·읍·면·리'].name = '';
          }}
        >
          {selectedLocation['시·도'].name || '시·도'}
        </span>
        <IconArrow
          width={5.67}
          direction="right"
          className="mx-2 text-gray-400"
        />
        <span
          className={`text-[16px] ${
            selectedLocation['시·군·구'].name
              ? 'text-[#595959]/100'
              : 'text-[#595959]/30'
          }  w-[80px] text-center whitespace-nowrap`}
          onClick={() => {
            setCurrentStep('시·군·구');
            selectedLocation['시·군·구'].name = '';
            selectedLocation['동·읍·면·리'].name = '';
          }}
        >
          {selectedLocation['시·군·구'].name.split('-').pop() || '시·군·구'}
        </span>
        <IconArrow
          width={5.67}
          direction="right"
          className="mx-2 text-gray-400"
        />
        <span
          className={`text-[16px] ${
            selectedLocation['동·읍·면·리'].name
              ? 'text-[#595959]/100'
              : 'text-[#595959]/30'
          }  w-[80px] text-center whitespace-nowrap`}
        >
          {selectedLocation['동·읍·면·리'].name.split('-').pop() || '동·읍·면'}
        </span>
      </div>
      <div
        className="grid grid-cols-3 mt-7"
        style={{
          gridAutoRows: '68px',
          height: `${Math.ceil(locationBlocks.length / 3) * 68}px`,
          width: '95%',
        }}
      >
        {locationBlocks.map((block, index) => (
          <LocationBlock
            key={index}
            locationBlockName={block.name}
            onClick={() => handleLocationClick(block)}
          />
        ))}
      </div>
    </div>
  );
};

interface LocationBlockProps {
  locationBlockName: string;
  onClick: () => void;
}

const LocationBlock: React.FC<LocationBlockProps> = ({
  locationBlockName,
  onClick,
}) => {
  return (
    <div
      className="flex justify-center items-center border border-[#000000]/4 bg-white h-[68px] w-[100%] cursor-pointer hover:bg-[#77CEBD]/10"
      onClick={onClick}
    >
      {locationBlockName.split('-').pop()}
    </div>
  );
};

const Buttons: React.FC<SelectLocationProps> = ({ selectedLocation }) => {
  const [isActive, _] = useState(false);
  const router = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          router('/'); // 메인 페이지로 이동
        }}
        className={'w-full h-[58px] px-2 gray-button'}
      >
        취소
      </button>
      <button
        className={`w-full h-[58px] px-2 ${
          isActive ? 'is-active-green-button' : 'non-active-green-button'
        }`}
        onClick={() => {
          // x 좌표 계산
          const centerLatState =
            selectedLocation['동·읍·면·리'].x !== 0
              ? selectedLocation['동·읍·면·리'].x
              : selectedLocation['시·군·구'].x !== 0
                ? selectedLocation['시·군·구'].x
                : selectedLocation['시·도'].x;

          // y 좌표 계산
          const centerLngState =
            selectedLocation['동·읍·면·리'].y !== 0
              ? selectedLocation['동·읍·면·리'].y
              : selectedLocation['시·군·구'].y !== 0
                ? selectedLocation['시·군·구'].y
                : selectedLocation['시·도'].y;
          // 페이지 이동
          router('/', {
            state: {
              centerLatState,
              centerLngState,
            },
          });
        }}
      >
        저장
      </button>
    </>
  );
};
