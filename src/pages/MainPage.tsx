import MapComponent from '../components/MapComponent';

const MainPage = () => {
  return (
    <div className="h-full w-full flex flex-col">
      {/* 지도가 남은 화면 공간을 채우도록 flex-grow 적용 */}
      <div className="flex-grow z-0">
        <MapComponent />
      </div>
    </div>
  );
};

export default MainPage;
