import React, { useEffect, useRef, useState } from 'react';
import MainMarker from './marker/CustomMainMarker';
import ImageMarker from './marker/CustomImageMarker';
import Polyline from './line/CustomPolyline'; // CustomPolyline 컴포넌트
import CurrentLocationButton from '../CurrentLocationButton';
import SerchButton from '../SerchButton';

interface CenterLocationProps {
  centerLat?: number;
  centerLng?: number;
}

const NaverMapComponent: React.FC<CenterLocationProps> = ({
  centerLat,
  centerLng,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // 지도 인스턴스를 저장할 ref
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // 현재 위치 저장 함수
  const saveCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });

          // 위치 저장 로직 (API 호출 등)
          console.log('Position saved:', { lat: latitude, lng: longitude });
        },
        (err) => {
          console.error('Failed to retrieve location:', err);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  //현재 위치 가져오는 함수
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Geolocation API가 브라우저에서 지원되지 않는 경우
        reject(new Error('Geolocation is not supported by this browser.'));
        return { lat: 37.5665, lng: 126.978 };
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude }); // 성공 시 위도와 경도를 반환
        },
        (error) => {
          reject(new Error('Failed to retrieve location: ' + error.message)); // 실패 시 에러 반환
        }
      );
    });
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      saveCurrentPosition();
    }, 3000);

    const initializeMap = async () => {
      if (!mapElement.current) return;

      const naver = (window as any).naver;

      let defaultLatLng = { lat: 37.5665, lng: 126.978 }; // 서울로 기본값 설정
      if (centerLat && centerLng) {
        defaultLatLng = { lat: centerLat, lng: centerLng }; // 서울로 기본값 설정
      } else {
        defaultLatLng = await getCurrentLocation(); // 서울로 기본값 설정
      }
      const mapOptions = {
        center: new naver.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng), // 현재 위치로 초기화
        zoom: 15,

        scaleControl: false,
        mapDataControl: false,
        logoControl: true,
        logoControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapInstance.current = new naver.maps.Map(mapElement.current, mapOptions);
      setCurrentPosition(defaultLatLng);
    };

    if (!(window as any).naver) {
      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_MAP_API_KEY;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, []); // 첫 렌더링 시 실행

  //현재위치 이동 버튼 클릭 시
  const moveToCurrentLocation = async () => {
    const currentLatLng = await getCurrentLocation();
    const newCenter = new (window as any).naver.maps.LatLng(
      currentLatLng.lat,
      currentLatLng.lng
    );
    setCurrentPosition(currentLatLng);
    if (mapInstance.current) {
      mapInstance.current.panTo(newCenter); // 부드럽게 중심 이동
    }
  };

  return (
    <>
      <div
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        ref={mapElement}
      >
        {mapInstance.current && currentPosition && (
          <>
            {/* 현재 위치 마커 */}
            <MainMarker
              position={currentPosition}
              mapInstance={mapInstance.current}
            />
          </>
        )}
      </div>
      {/* 현재 위치 버튼 */}
      <CurrentLocationButton onMoveToCurrentLocation={moveToCurrentLocation} />
      {/* 검색 버튼 */}
      <SerchButton />
    </>
  );
};

export default NaverMapComponent;
