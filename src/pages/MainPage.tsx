import MapComponent from '../components/MainPage/Map/NaverMapComponent';
import SelectBox from '../components/MainPage/SelectBox';
import { useState } from 'react';

const MainPage = () => {
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number>(0); // 셀렉트 박스 상태 관리

  return (
    <div className="h-full w-full z-0 flex flex-col relative">
      {/* 지도 컴포넌트 */}
      <div className="flex-grow">
        <MapComponent />
      </div>
      {/* 조회/기록 셀렉트 박스 */}
      <SelectBox
        leftText="조회"
        rightText="기록"
        selectedBoxIndex={selectedBoxIndex} // 선택 상태 전달
        setSelectedBoxIndex={setSelectedBoxIndex} // 상태 업데이트
      />
    </div>
  );
};

export default MainPage;
