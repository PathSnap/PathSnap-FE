import React, { useEffect, useRef } from 'react';

interface CustomPolylineProps {
  path: { lat: number; lng: number }[]; // 위도와 경도 데이터 배열
  mapInstance: any; // Naver 지도 인스턴스
  lineColor?: string; // 선 색상
  lineWidth?: number; // 선 두께
}

const CustomPolyline: React.FC<CustomPolylineProps> = ({
  path,
  mapInstance,
  lineColor = '#77CEBD', // 기본 선 색상
  lineWidth = 6, // 기본 선 두께
}) => {
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    const naver = (window as any).naver;
    if (!naver || !mapInstance || path.length < 2) return; // 경로가 2개 이상 있어야 선을 그림

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    // Naver Polyline 생성
    const polyline = new naver.maps.Polyline({
      map: mapInstance,
      path: path.map((point) => new naver.maps.LatLng(point.lat, point.lng)), // LatLng 객체로 변환
      strokeColor: lineColor,
      strokeWeight: lineWidth,
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
    });

    polylineRef.current = polyline;

    return () => {
      // 컴포넌트 언마운트 시 폴리라인 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [path, mapInstance, lineColor, lineWidth]);

  return null; // Polyline은 React에서 렌더링하지 않음
};

export default CustomPolyline;
