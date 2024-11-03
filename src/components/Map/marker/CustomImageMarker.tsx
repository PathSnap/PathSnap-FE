import { DivIcon } from 'leaflet';

const customImageMarker = new DivIcon({
  className: '', // 기본 클래스 제거
  html: `
    <div class="relative w-12 h-12 bg-white rounded-lg shadow-md overflow-hidden">
      <img class="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8okjLgjub3x6p8NLNvQJlWzG6xgfK0DQx4w&s" alt="Marker Image" />
      <div class="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white"></div>
    </div>
  `,
  iconSize: [50, 60], // 마커 크기
  iconAnchor: [25, 60], // 마커의 기준점
});

export default customImageMarker;
