import MapComponent from '../components/MainPage/Map/NaverMapComponent';
import SelectBox from '../components/MainPage/SelectBox';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 사용

const MainPage = () => {
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number>(0); // 셀렉트 박스 상태 관리
  const location = useLocation(); // 현재 페이지로 전달된 데이터 가져오기

  // 전달받은 위도와 경도
  const centerLat = location.state?.centerLatState || null;
  const centerlng = location.state?.centerLngState || null;

  return (
    <div className="h-full w-full z-0 flex flex-col relative">
      {/* 지도 컴포넌트 */}
      <div className="flex-grow">
        <MapComponent centerLat={centerLat} centerlng={centerlng} />
        {/* <MapComponent centerLat={37.5665} centerlng={126.978} /> */}
        {/* props 전달 */}
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
