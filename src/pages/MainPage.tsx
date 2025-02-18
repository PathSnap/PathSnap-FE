// import { useEffect } from 'react';
import MapComponent from '../components/MainPage/Map/NaverMapComponent';
import { useLocation } from 'react-router-dom'; // useLocation 사용

const MainPage = () => {
  const location = useLocation(); // 현재 페이지로 전달된 데이터 가져오기

  // 전달받은 위도와 경도
  let centerLat = null;
  let centerlng = null;
  let mainZoom = 10;

  centerLat = location.state?.centerLatState;
  centerlng = location.state?.centerLngState;
  mainZoom = location.state?.mainZoom;

  return (
    <div className="h-full w-full z-0 flex flex-col relative">
      {/* 지도 컴포넌트 */}
      <div className="flex-grow">
        <MapComponent
          centerLat={centerLat}
          centerLng={centerlng}
          mainZoom={mainZoom}
        />
        {/* <MapComponent centerLat={37.5665} centerlng={126.978} /> */}
        {/* props 전달 */}
      </div>
    </div>
  );
};

export default MainPage;
