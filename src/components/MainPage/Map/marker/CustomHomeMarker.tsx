import React, { useEffect, useRef } from 'react';

interface CustomHomeMarkerProps {
  position: { lat: number; lng: number }; // 마커 위치 (위도, 경도)
  mapInstance: any; // 네이버 지도 인스턴스
}

const CustomHomeMarker: React.FC<CustomHomeMarkerProps> = ({
  position,
  mapInstance,
}) => {
  const markerRef = useRef<any>(null); // 마커 인스턴스를 저장할 Ref

  useEffect(() => {
    if (!mapInstance) return; // 지도 인스턴스가 없는 경우 종료

    const naver = (window as any).naver;

    // 기존 마커 삭제
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 새로운 마커 생성
    markerRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: mapInstance,
      icon: {
        content: `
          <div class="flex items-center justify-center">
            <svg
              width="50"
              height="50"
              viewBox="0 0 78 78"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_700_3279)">
                <circle cx="38.9993" cy="38.9993" r="18.9993" fill="white" />
              </g>
              <circle cx="39" cy="39" r="16" fill="#77CEBD" />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M31.7335 35.3612C31.2693 35.741 31 36.3092 31 36.9091V44.1432C31 45.2477 31.8954 46.1432 33 46.1432H45C46.1046 46.1432 47 45.2477 47 44.1432V36.9091C47 36.3092 46.7307 35.741 46.2665 35.3612L40.2665 30.4521C39.5297 29.8493 38.4703 29.8493 37.7335 30.4521L31.7335 35.3612ZM39.0013 38.8705C37.7963 38.8705 36.8194 39.8473 36.8194 41.0523V44.6887H41.1831V41.0523C41.1831 39.8473 40.2062 38.8705 39.0013 38.8705Z"
                fill="white"
              />
            </svg>
          </div>
        `,
        anchor: new naver.maps.Point(25, 25), // 마커 중심점 설정
      },
    });

    return () => {
      // 컴포넌트 언마운트 시 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [position, mapInstance]);

  return null; // 마커는 React DOM에 렌더링하지 않음
};

export default CustomHomeMarker;
