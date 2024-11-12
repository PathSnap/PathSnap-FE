import React from 'react';
import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';

interface CustomMainMarkerProps {
  position: [number, number];
}

const CustomMainMarker: React.FC<CustomMainMarkerProps> = ({ position }) => {
  // DivIcon을 생성하여 마커 스타일 정의
  const customIcon = new DivIcon({
    className: '', // 기본 클래스 제거
    html: `
      <div class="bg-primaryLight border-4 border-borderLight rounded-full w-8 h-8 flex items-center justify-center animate-main_marker_glow">
        <div class="bg-primaryDark rounded-full w-4 h-4"></div>
      </div>
    `,
    iconAnchor: [16, 16], // 아이콘 기준점 설정
  });

  return <Marker position={position} icon={customIcon} />;
};

export default CustomMainMarker;
