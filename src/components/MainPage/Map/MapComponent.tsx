import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMainMarker from './marker/CustomMainMarker';
import CustomImageMarker from './marker/CustomImageMarker';

interface MapComponentProps {
  currentPosition: [number, number] | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ currentPosition }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);

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

  useEffect(() => {
    if (currentPosition) {
      setPosition(currentPosition);
    }
  }, [currentPosition]);

  const SetViewOnPosition = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, 17);
    }, [position]);
    return null;
  };

  return (
    <MapContainer style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <>
          <CustomMainMarker position={position} />

          <CustomImageMarker
            position={[position[0] + 0.002, position[1] + 0.002]}
            imageSrc="https://cdn.pixabay.com/photo/2022/12/02/16/52/the-path-7631282_640.jpg"
          />

          <CustomImageMarker
            position={[position[0] - 0.002, position[1] - 0.002]}
            imageSrc="https://cdn.pixabay.com/photo/2023/02/07/07/21/road-7773395_640.jpg"
          />

          <CustomImageMarker
            position={[position[0] - 0.0015, position[1] + 0.002]}
            imageSrc="https://cdn.pixabay.com/photo/2024/08/28/09/34/bridge-9003553_640.jpg"
          />

          <SetViewOnPosition position={position} />
        </>
      )}
    </MapContainer>
  );
};

export default MapComponent;
