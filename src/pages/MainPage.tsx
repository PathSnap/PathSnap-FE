// pages/MainPage.tsx

import MapComponent from '../components/MainPage/Map/MapComponent';
import CurrentLocationButton from '../components/MainPage/CurrentLocationButton';
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
    <div className="h-full w-full flex flex-col">

      {/* 지도가 남은 화면 공간을 채우도록 flex-grow 적용 */}
      <div className="flex-grow z-0">
        <MapComponent currentPosition={currentPosition} />
      </div>
      
      {/* 현재 위치로 이동 버튼 */}
      <CurrentLocationButton onClick={goToCurrentLocation} />
      
    </div>
  );
};

export default MainPage;
