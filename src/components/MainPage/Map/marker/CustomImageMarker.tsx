import React, { useEffect, useRef } from 'react';

interface CustomImageMarkerProps {
  position: { lat: number; lng: number }; // 마커 위치
  imageSrc: string; // 마커 이미지 경로
  mapInstance: any; // Naver 지도 인스턴스
  isSelect?: boolean; // 선택 여부
}

const CustomImageMarker: React.FC<CustomImageMarkerProps> = ({
  position,
  imageSrc,
  mapInstance,
  isSelect = false, // 기본값 false
}) => {
  const overlayRef = useRef<any>(null);

  useEffect(() => {
    const naver = (window as any).naver;
    if (!naver || !mapInstance) return;

    // HTML 요소 생성
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.innerHTML = `
      <div class="relative ${
        isSelect
          ? 'h-[80px] w-[80px] bg-[#77CEBD]'
          : 'h-[64px] w-[64px] bg-white'
      } rounded-xl shadow-xl">
        <div class="h-full ${
          isSelect ? 'p-[6px]' : 'p-[4px]'
        }"> <!-- 패딩 값 변경 -->
          <img class="aspect-square h-full w-full rounded-xl object-cover" src="${imageSrc}" alt="Marker Image" />
        </div>
        <div class="absolute bottom-[-7px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-[10px] border-r-[10px] border-t-[10px] ${
          isSelect ? 'border-t-[#77CEBD]' : 'border-t-[#FFFFFF]'
        } border-l-transparent border-r-transparent"></div>
      </div>
    `;

    // OverlayView 생성
    const overlay = new naver.maps.OverlayView();

    overlay.onAdd = () => {
      overlay.getPanes().overlayLayer.appendChild(element);
    };
    overlay.draw = () => {
      const projection = overlay.getProjection();
      const pixelPosition = projection.fromCoordToOffset(
        new naver.maps.LatLng(position.lat, position.lng)
      );

      // 소수점을 제거하여 위치를 고정
      const fixedPixelX = Math.round(pixelPosition.x);
      const fixedPixelY = Math.round(pixelPosition.y);

      // 픽셀 좌표를 설정하고 마커 크기 고려
      const offset = isSelect ? 40 : 32; // 선택 여부에 따라 크기 조정
      const height = isSelect ? 80 : 64;

      element.style.left = `${fixedPixelX - offset}px`;
      element.style.top = `${fixedPixelY - height}px`;
    };

    overlay.onRemove = () => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };

    overlay.setMap(mapInstance); // 지도에 추가

    overlayRef.current = overlay;

    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null); // 지도에서 제거
      }
    };
  }, [position, imageSrc, mapInstance, isSelect]);

  return null; // 마커는 직접 DOM에 렌더링되므로 React 컴포넌트에서는 렌더링하지 않음
};

export default CustomImageMarker;
