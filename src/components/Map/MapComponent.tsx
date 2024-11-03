import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import customMainMarker from './marker/CustomMainMarker'; 
import customImageMarker from './marker/CustomImageMarker';

const MapComponent: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null); // 타입을 [number, number]로 수정

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setPosition([37.5665, 126.978]); // 기본 위치 (서울)
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setPosition([37.5665, 126.978]);
    }
  }, []);

  // 현재 위치를 업데이트하는 컴포넌트
  const SetViewOnPosition = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 17); // 줌 레벨은 13으로 설정
    }, [position]);
    return null;
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={position || [37.5665, 126.978]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <>
            {/* 현재 위치에 첫 번째 마커 */}
            <Marker position={position} icon={customMainMarker}/>

            {/* 현재 위치에서 오른쪽 위로 조금 떨어진 위치에 두 번째 마커 */}
            <Marker
              position={[
                position[0] + 0.002, // 약간 위쪽으로 이동
                position[1] + 0.002, // 약간 오른쪽으로 이동
              ]}
              icon={customImageMarker}
            />

            <SetViewOnPosition position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
