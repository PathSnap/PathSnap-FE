import React, { useEffect, useRef, useState } from 'react';
import MainMarker from './marker/CustomMainMarker';
import ImageMarker from './marker/CustomImageMarker';
import CurrentLocationButton from '../CurrentLocationButton';
import Polyline from './line/CustomPolyline'; // CustomPolyline 컴포넌트
import SerchButton from '../SerchButton';

const NaverMapComponent: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // 지도 인스턴스를 저장할 ref
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapElement.current) return;

      const naver = (window as any).naver;

      const setInitialLocation = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        const mapOptions = {
          center: new naver.maps.LatLng(latitude, longitude), // 현재 위치로 초기화
          zoom: 15,
        };

        // 지도 인스턴스 생성
        mapInstance.current = new naver.maps.Map(
          mapElement.current,
          mapOptions
        );

        // 현재 위치 저장
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      };

      const setDefaultLocation = () => {
        const defaultLatLng = { lat: 37.5665, lng: 126.978 }; // 서울로 기본값 설정
        const mapOptions = {
          center: new naver.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng),
          zoom: 15,
        };

        mapInstance.current = new naver.maps.Map(
          mapElement.current,
          mapOptions
        );

        setCurrentPosition(defaultLatLng);
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setInitialLocation, (err) => {
          console.error('Failed to retrieve location:', err);
          setDefaultLocation();
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        setDefaultLocation();
      }
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

  const moveToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = new (window as any).naver.maps.LatLng(
            latitude,
            longitude
          );

          if (mapInstance.current) {
            mapInstance.current.panTo(newCenter); // 부드럽게 중심 이동
          }

          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // 현재 위치의 약간 오른쪽 위 좌표 계산
  const getOffsetPosition = () => {
    if (!currentPosition) return null;
    const offsetLat = currentPosition.lat + 0.0005; // 위도 약간 증가
    const offsetLng = currentPosition.lng + 0.0005; // 경도 약간 증가
    return { lat: offsetLat, lng: offsetLng };
  };

  const offsetPosition = getOffsetPosition();
  // 경로 데이터 생성 (현재 위치와 offsetPosition을 포함)
  const polylinePath =
    currentPosition && offsetPosition ? [currentPosition, offsetPosition] : [];

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
            {/* 이미지 마커 */}
            {offsetPosition && (
              <ImageMarker
                position={offsetPosition}
                mapInstance={mapInstance.current}
                imageSrc="https://images.pexels.com/photos/29358898/pexels-photo-29358898.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" // 테스트 이미지 경로
                isSelect={true} // 선택된 상태 아님
              />
            )}
            {/* 경로 표시 (Polyline) */}
            {polylinePath.length > 1 && (
              <Polyline path={polylinePath} mapInstance={mapInstance.current} />
            )}
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
