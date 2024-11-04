// pages/MainPage.tsx

import MapComponent from '../components/MainPage/Map/MapComponent';
import CurrentLocationButton from '../icons/MainPage/CurrentLocationButton';
import { useState } from 'react';

const MainPage = () => {
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);

  const goToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col relative">
      {/* 지도가 남은 화면 공간을 채우도록 flex-grow 적용 */}
      <div className="flex-grow">
        <MapComponent currentPosition={currentPosition} />
      </div>
      {/* Footer 영역 확보 */}
      <div className="h-20"></div>

      {/* 현재 위치로 이동 버튼 */}
      <CurrentLocationButton onClick={goToCurrentLocation} />
    </div>
  );
};

export default MainPage;
