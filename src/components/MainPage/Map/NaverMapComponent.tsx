import React, { useEffect, useRef, useState } from 'react';
import MainMarker from './marker/CustomMainMarker';
import HomeMarker from './marker/CustomHomeMarker';
import ImageMarker from './marker/CustomImageMarker';
// import Polyline from './line/CustomPolyline'; // CustomPolyline 컴포넌트
import CurrentLocationButton from '../CurrentLocationButton';
import SerchButton from '../SerchButton';
import usePhotoStore from '../../../stores/PhotoStore';
import useUserInfoStore from '../../../stores/UserInfo';

interface CenterLocationProps {
  centerLat?: number;
  centerLng?: number;
  mainZoom?: number;
}

const NaverMapComponent: React.FC<CenterLocationProps> = ({
  centerLat,
  centerLng,
  mainZoom,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // 지도 인스턴스를 저장할 ref
  const { togglePhotoSelection, searchPhotos, photos } = usePhotoStore();
  const { getUserInfo, userInfo } = useUserInfoStore();
  // 현재 위치 상태 저장 함수
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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
          // console.log('Position saved:', { lat: latitude, lng: longitude });
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

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    //현재위치 상태 저장 타이머
    intervalId.current = setInterval(() => {
      saveCurrentPosition();
    }, 3000);

    //현재 집 위치 저장
    getUserInfo();

    //지도 초기화 함수
    const initializeMap = async () => {
      if (!mapElement.current) return;

      const naver = (window as any).naver;

      let defaultLatLng = { lat: 37.5665, lng: 126.978 }; // 서울로 기본값 설정
      let zoom = 15;
      if (centerLat && centerLng && mainZoom) {
        defaultLatLng = { lat: centerLat, lng: centerLng }; // 서울로 기본값 설정
        zoom = mainZoom;
      } else {
        defaultLatLng = await getCurrentLocation(); // 서울로 기본값 설정
      }
      const mapOptions = {
        center: new naver.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng), // 현재 위치로 초기화
        zoom: zoom,

        scaleControl: false,
        mapDataControl: false,
        logoControl: true,
        logoControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapInstance.current = new naver.maps.Map(mapElement.current, mapOptions);
      setCurrentPosition(defaultLatLng);
      const defaultZoom = zoom;
      handleCenterChange({
        lat: defaultLatLng.lat,
        lng: defaultLatLng.lng,
        zoom: defaultZoom,
      });

      // 중심 위치 변경 이벤트 리스너 등록
      mapInstance.current.addListener('center_changed', () => {
        const center = mapInstance.current.getCenter();
        const lat = center.lat();
        const lng = center.lng();
        const zoom = mapInstance.current.getZoom(); // 현재 줌 레벨 가져오기
        const defaultZoom = zoom;
        handleCenterChange({ lat, lng, zoom: defaultZoom });
      });
    };

    //네이버 지도 API 스크립트 로드
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

  // 중심 위치 변경 이벤트 핸들러
  let CenterChangeTimeout: NodeJS.Timeout | null = null; // 타이머 저장용 변수
  const handleCenterChange = (newCenter: {
    lat: number;
    lng: number;
    zoom: number;
  }) => {
    if (CenterChangeTimeout) {
      // 3초 동안 로그가 이미 제한되어 있다면 바로 리턴
      return;
    }
    console.log('Center changed to:', newCenter);
    // 최대 반경 (줌 레벨 6)과 최소 반경 (줌 레벨 21) 정의
    const maxRadius = 6; // 줌 레벨 6
    const minRadius = 0.0002; // 줌 레벨 21

    // 기하급수적으로 줄어드는 비율 계산
    const scaleFactor = Math.pow(minRadius / maxRadius, 1 / 15); // 15 단계로 스케일링
    const radius = maxRadius * Math.pow(scaleFactor, newCenter.zoom - 6);

    searchPhotos(newCenter.lng, newCenter.lat, radius); // lon, lat, radius

    CenterChangeTimeout = setTimeout(() => {
      CenterChangeTimeout = null; // 3초 후 제한 해제
    }, 500);
  };

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

  const ClickImageMarker = (recordId: string) => {
    // 선택된 이미지 마커의 photoId를 받아와서 처리하는 함수
    console.log('Click Image Marker:', recordId);
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
            {/* 홈 마커 */}
            {userInfo && userInfo.lat && userInfo.lng && (
              <HomeMarker
                position={{ lat: userInfo.lat, lng: userInfo.lng }}
                mapInstance={mapInstance.current}
              />
            )}
            {/* 이미지 마커 */}
            {photos.map((photo) => (
              <ImageMarker
                key={photo.photoId} // 고유한 key 추가
                position={{ lat: photo.lat, lng: photo.lng }}
                mapInstance={mapInstance.current}
                imageSrc={photo.url} // 테스트 이미지 경로
                isSelect={photo.isSelect} // 선택된 상태 아님
                ClickImageMarker={() => {
                  ClickImageMarker(photo.recordId);
                  togglePhotoSelection(photo.photoId);
                }} // 클릭 이벤트 추가
              />
            ))}
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
