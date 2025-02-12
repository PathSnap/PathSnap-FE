import React, { useEffect, useRef } from 'react';
import { coordinate } from '../../../stores/RecordStore';

interface DynamicMapProps {
  lat: number;
  lng: number;
  level?: number;
  width?: string | number;
  height?: string | number;
  coordinates: coordinate[];
  lineColor?: string;
  lineWidth?: number;
}

const DynamicMap: React.FC<DynamicMapProps> = ({
  lat,
  lng,
  level = 14,
  width = '100%', // 기본값을 '100%'로 설정하여 부모 컨테이너에 맞게 확장
  height = '100%', // 기본값을 '100%'로 설정하여 부모 컨테이너에 맞게 확장
  coordinates,
  lineColor = '#77CEBD',
  lineWidth = 5,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const polylineRef = useRef<any>(null); // 폴리라인 참조
  // 로고 크기 조정 (CSS)
  const adjustLogoSize = () => {
    const logos = document.querySelectorAll(
      'img[alt="NAVER"]'
    ) as NodeListOf<HTMLImageElement>;
    logos.forEach((logo) => {
      const parent = logo.parentElement;
      if (parent) {
        parent.style.transform = 'scale(0.7)';
        parent.style.transformOrigin = 'top right';
        parent.style.width = 'auto';
        parent.style.height = 'auto';
      }
    });
  };
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const naver = (window as any).naver;
    const map = new naver.maps.Map(mapContainerRef.current, {
      center: new naver.maps.LatLng(lat, lng),
      zoom: level,
      draggable: true, // 🛑 드래그 비활성화
      pinchZoom: false, // 🛑 터치 줌 비활성화
      scrollWheel: true, // 🛑 마우스 휠 줌 비활성화
      keyboardShortcuts: false, // 🛑 키보드 조작 방지
      disableDoubleClickZoom: false, // 🛑 더블 클릭 줌 방지
      zoomControl: false, // 🛑 줌 컨트롤 버튼 숨김
      scaleControl: false,
      mapDataControl: false,
      logoControl: true,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    });

    // 경로(Polyline) 추가
    if (coordinates.length > 1) {
      const path = coordinates.map(
        (coord) => new naver.maps.LatLng(coord.lat, coord.lng)
      );

      // 기존 Polyline이 있을 경우 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }

      // 새 Polyline 추가
      polylineRef.current = new naver.maps.Polyline({
        map,
        path,
        strokeColor: lineColor,
        strokeWeight: lineWidth,
        strokeOpacity: 1.0,
      });
    }

    // 컴포넌트 언마운트 시 Polyline 제거
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [lat, lng, level, coordinates, lineColor, lineWidth]); // 좌표나 지도 설정이 바뀔 때만 재렌더링

  adjustLogoSize(); // 지도 로딩 후 로고 크기 조정

  return (
    <div
      ref={mapContainerRef}
      style={{ width: width, height: height, border: '1px solid #ddd' }}
    />
  );
};

export default DynamicMap;
