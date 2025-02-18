import React, { useState, useEffect } from 'react';
import { coordinate } from '../../../stores/RecordStore';

interface StaticMapProps {
  lat: number; // 중심 위도
  lng: number; // 중심 경도
  level?: number; // 확대 레벨
  width?: number; // 이미지 너비
  height?: number; // 이미지 높이
  coordinates: coordinate[]; // 선을 그릴 경로 좌표 배열
  lineColor?: string; // 선 색상 (예: '#77CEBD')
  lineWidth?: number; // 선 두께
}

const StaticMap: React.FC<StaticMapProps> = ({
  lat,
  lng,
  level = 16,
  width = 600,
  height = 400,
  coordinates,
  // lineColor = '#ff0000',
  lineColor = '#77CEBD',
  lineWidth = 20,
}) => {
  const [mapSrc, setMapSrc] = useState('');

  useEffect(() => {
    const fetchStaticMap = () => {
      try {
        // 1) coordinates 배열을 "경도 위도;경도 위도;..." 형태로 직렬화
        //    (Static Map API는 pos에 "lng lat" 순서로 요구)
        const pathString = coordinates
          .map((coord) => `${coord.lng} ${coord.lat}`)
          .join(';');

        // 2) paths 파라미터 - style에 lw(lineWidth), co(색상), fill 등 지정
        //    color는 #77CEBD 같은 16진 컬러를 0x77CEBD 형식으로 넣을 수 있음
        //    (문서상 co:FF0000FF 같이 ARGB 형태도 가능)
        //    strokeOpacity를 조절하려면 co: 뒤쪽에 알파 채널까지 지정해야 합니다.
        const colorHex = lineColor.replace('#', '0x');
        const pathsParam = `style:lw:${lineWidth}|co:${colorHex}|fill:false|pos:${pathString}`;

        // 3) raster-cors 엔드포인트 (HTTP Referer 인증)
        //    혹은 raster 엔드포인트(헤더 인증) 쓸 경우 Preflight 문제 발생
        //    여기서는 raster-cors를 예시로 합니다.
        const baseUrl =
          'https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors';

        // 4) 쿼리 스트링 구성
        // &paths= 파라미터에 인코딩한 pathsParam을 넣어주어야 합니다.
        const url =
          `${baseUrl}?center=${lng},${lat}&level=${level}&w=${width}&h=${height}&X-NCP-APIGW-API-KEY-ID=${import.meta.env.VITE_MAP_API_KEY}` +
          `&paths=${encodeURIComponent(pathsParam)}`;

        setMapSrc(url);
        console.log('Static map URL:', url);
      } catch (error) {
        console.error('Error building static map URL:', error);
      }
    };

    fetchStaticMap();
  }, [lat, lng, level, width, height, coordinates, lineColor, lineWidth]);

  return (
    <div>
      {mapSrc ? (
        <img
          src={mapSrc}
          alt="Naver static map"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      ) : (
        <div>지도 불러오는 중...</div>
      )}
    </div>
  );
};

export default StaticMap;
