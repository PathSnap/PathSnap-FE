import { DivIcon } from 'leaflet';

// 커스텀 DivIcon 생성
const customMainMarker = new DivIcon({
  className: '', // 기본 클래스 제거
  html: `<div class="custom-main-marker">
            <div class="custom-main-marker-inner">
            </div>
          </div>`,
  iconSize: [32, 32], // 아이콘의 전체 크기
  iconAnchor: [16, 16], // 아이콘의 중심을 기준으로 위치
});

export default customMainMarker;
