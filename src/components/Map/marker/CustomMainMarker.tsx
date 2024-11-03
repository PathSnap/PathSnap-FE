import { DivIcon } from 'leaflet';

// 커스텀 DivIcon 생성
const customMainMarker = new DivIcon({
  className: '', // 기본 클래스 제거
  html: `
    <div class="bg-primaryLight border-4 border-borderLight rounded-full w-8 h-8 flex items-center justify-center animate-glow">
      <div class="bg-primaryDark rounded-full w-4 h-4"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default customMainMarker;
