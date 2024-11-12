import React, { useEffect, useRef } from 'react';

interface NaverMapComponentProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const NaverMapComponent: React.FC<NaverMapComponentProps> = ({ center, zoom }) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!mapElement.current) return;

      // naver를 지역 변수로 선언
      const naver = (window as any).naver;

      if (naver) {
        const mapOptions = {
          center: new naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
        };

        new naver.maps.Map(mapElement.current, mapOptions);
      }
    };

    if (!(window as any).naver) {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }
  }, [center, zoom]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMapComponent;
