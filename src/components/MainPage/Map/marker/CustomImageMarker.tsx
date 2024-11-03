import { Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';

interface CustomImageMarkerProps {
  position: [number, number];
  imageSrc: string;
}

const CustomImageMarker: React.FC<CustomImageMarkerProps> = ({
  position,
  imageSrc,
}) => {
  // DivIcon을 생성하여 이미지 포함
  const customIcon = new DivIcon({
    className: '', // 기본 클래스 제거
    html: `
      <div class="relative h-[64px] w-[64px] rounded-xl bg-[#FFFFFF] shadow-xl">
        <div class="h-full p-[4px]">
          <img class="aspect-square h-full w-full rounded-xl object-cover" src="${imageSrc}" alt="Marker Image" />
        </div>
        <div class="absolute bottom-[-7px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#FFFFFF]"></div>
      </div>
    `,
    iconAnchor: [32, 64], // 마커의 기준점을 이미지 하단으로 설정
  });

  return <Marker position={position} icon={customIcon} />;
};

export default CustomImageMarker;
