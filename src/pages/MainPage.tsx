import MapComponent from '../components/Map/MapComponent';

const MainPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* 지도가 남은 화면 공간을 채우도록 flex-grow 적용 */}
      <div className="flex-grow">
        <MapComponent />
      </div>
      {/* Footer 영역 확보 */}
      <div className="h-20"></div>
    </div>
  );
};

export default MainPage;
