import React, { useEffect, useRef } from 'react';

interface CustomMainMarkerProps {
  position: { lat: number; lng: number }; // 마커 위치
  mapInstance: any; // 네이버 지도 인스턴스
}

const CustomMainMarker: React.FC<CustomMainMarkerProps> = ({
  position,
  mapInstance,
}) => {
  const markerRef = useRef<any>(null); // 마커 인스턴스 저장

  useEffect(() => {
    if (!mapInstance) return;

    const naver = (window as any).naver;

    // 기존 마커 삭제
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // 새로운 HTML 마커 생성
    markerRef.current = new naver.maps.Marker({
      position: new naver.maps.LatLng(position.lat, position.lng),
      map: mapInstance,
      icon: {
        content: `
          <div class="bg-primaryLight border-4 border-borderLight rounded-full w-7 h-7 flex items-center justify-center animate-main_marker_glow">
            <div class="bg-primaryDark rounded-full w-3 h-3"></div>
          </div>
        `,
        anchor: new naver.maps.Point(16, 16), // 중심점 설정
      },
    });

    return () => {
      // 컴포넌트 언마운트 시 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [position, mapInstance]);

  return null; // HTML 마커는 직접 DOM에 그려지므로 React에는 렌더링하지 않음
};

export default CustomMainMarker;
