import React, { useEffect, useRef, useState } from 'react';
import MainMarker from './marker/CustomMainMarker';
import HomeMarker from './marker/CustomHomeMarker';
import ImageMarker from './marker/CustomImageMarker';
import Polyline from './line/CustomPolyline'; // CustomPolyline 컴포넌트
import CurrentLocationButton from '../CurrentLocationButton';
import SelectBox from '../../../components/MainPage/SelectBox';
import SearchButton from '../SerchButton';
import IconRecordInfo from '../../../icons/IconRecordInfo';
import PhotoRecordSlider from './PhotoRecordSlider';
import usePhotoStore from '../../../stores/PhotoStore';
import useUserInfoStore from '../../../stores/UserInfo';
import useRecordStore from '../../../stores/RecordStore';
import useRouteRecordStore from '../../../stores/RouteRecord';
import { useLocation, useNavigate } from 'react-router-dom';

interface CenterLocationProps {
  centerLat?: number | null;
  centerLng?: number | null;
  mainZoom?: number | null;
}

const NaverMapComponent: React.FC<CenterLocationProps> = ({
  centerLat,
  centerLng,
  mainZoom,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // 지도 인스턴스를 저장할 ref
  const [isSearchDetailRecord, setIsSerachDetailRecord] =
    useState<boolean>(false);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number>(0); // 셀렉트 박스 상태 관리
  const { searchPhotos, photos } = usePhotoStore();
  const { getUserInfo, userInfo } = useUserInfoStore();
  const {
    changePhotoRecordIsSelect,
    changeALLPhotoRecordIsSelectfalse,
    searchRecord,
    setRecord,
    record,
  } = useRecordStore((state) => state);
  const recordingInfo = useRouteRecordStore((state) => state.recordingInfo);
  // 현재 위치 상태 저장 함수
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(true); // 위치 로딩 상태
  const location = useLocation();
  const navigate = useNavigate();

  //현재 위치 저장 함수
  const saveCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });

          setLoading(false); // 로딩 완료
          // 위치 저장 로직 (API 호출 등)
          // console.log('Position saved:', { lat: latitude, lng: longitude });
        },
        (err) => {
          console.error('Failed to retrieve location:', err);
          setLoading(false); // 오류 시 로딩 해제
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  //현재 위치 가져오는 함수
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Geolocation API가 브라우저에서 지원되지 않는 경우
        reject(new Error('Geolocation is not supported by this browser.'));
        return { lat: 37.5665, lng: 126.978 };
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude }); // 성공 시 위도와 경도를 반환
        },
        (error) => {
          reject(new Error('Failed to retrieve location: ' + error.message)); // 실패 시 에러 반환
        }
      );
    });
  };

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    // userId가 로컬 스토리지에 없으면 로그인 페이지로 이동
    if (!localStorage.getItem('userId')) {
      navigate('/login');
    }
    //현재위치 상태 저장 타이머
    intervalId.current = setInterval(() => {
      saveCurrentPosition();
    }, 3000);

    //현재 집 위치 저장
    getUserInfo();

    //지도 초기화 함수
    const initializeMap = async () => {
      if (!mapElement.current) return;

      const naver = (window as any).naver;

      let defaultLatLng = { lat: 37.5665, lng: 126.978 }; // 서울 시청 좌표
      let zoom = 15;
      if (centerLat && centerLng && mainZoom) {
        defaultLatLng = { lat: centerLat, lng: centerLng };
        zoom = mainZoom;
      } else {
        defaultLatLng = await getCurrentLocation();
      }
      const mapOptions = {
        center: new naver.maps.LatLng(defaultLatLng.lat, defaultLatLng.lng), // 현재 위치로 초기화
        zoom: zoom,

        scaleControl: false,
        mapDataControl: false,
        logoControl: true,
        logoControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapInstance.current = new naver.maps.Map(mapElement.current, mapOptions);
      setCurrentPosition(defaultLatLng);
      const defaultZoom = zoom;
      handleCenterChange({
        lat: defaultLatLng.lat,
        lng: defaultLatLng.lng,
        zoom: defaultZoom,
      });

      // 중심 위치 변경 이벤트 리스너 등록
      mapInstance.current.addListener('center_changed', () => {
        const center = mapInstance.current.getCenter();
        const lat = center.lat();
        const lng = center.lng();
        const zoom = mapInstance.current.getZoom(); // 현재 줌 레벨 가져오기
        const defaultZoom = zoom;
        handleCenterChange({ lat, lng, zoom: defaultZoom });
      });
    };

    //네이버 지도 API 스크립트 로드
    if (!(window as any).naver) {
      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_MAP_API_KEY;
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${apiKey}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    recordingInfo.isSerching = false;
  }, []); // 첫 렌더링 시 실행

  useEffect(() => {
    const fetchData = async () => {
      let resRecord;
      if (location?.state?.recordId) {
        resRecord = await searchRecord(location?.state?.recordId);
      }
      //1초뒤 실행
      if (
        location?.state?.recordId &&
        resRecord &&
        resRecord?.photoRecords &&
        resRecord?.photoRecords?.length > 0
      ) {
        //record.photoRecords의 첫번쨰 사진의 isSelect를 true로 변경 및 photo에 저장
        const photo = resRecord.photoRecords[0];
        changeALLPhotoRecordIsSelectfalse();
        if (photo) {
          const res = changePhotoRecordIsSelect(photo.photoId);
          setRecord(res);
          const newCenter = new (window as any).naver.maps.LatLng(
            photo.lat,
            photo.lng
          );
          if (mapInstance.current) {
            mapInstance.current.panTo(newCenter); // 부드럽게 중심 이동
          }
        }
      }
    };
    if (location?.state?.recordId) {
      recordingInfo.isSerching = true;
      setIsSerachDetailRecord(true);
      setSelectedBoxIndex(0);
    }
    fetchData();
  }, [location?.state?.recordId]);

  // 중심 위치 변경 이벤트 핸들러
  let CenterChangeTimeout: NodeJS.Timeout | null = null; // 타이머 저장용 변수
  const handleCenterChange = (newCenter: {
    lat: number;
    lng: number;
    zoom: number;
  }) => {
    if (CenterChangeTimeout) {
      // 3초 동안 로그가 이미 제한되어 있다면 바로 리턴
      return;
    }
    // console.log('Center changed to:', newCenter);
    // 최대 반경 (줌 레벨 6)과 최소 반경 (줌 레벨 21) 정의
    const maxRadius = 6; // 줌 레벨 6
    const minRadius = 0.0002; // 줌 레벨 21

    // 기하급수적으로 줄어드는 비율 계산
    const scaleFactor = Math.pow(minRadius / maxRadius, 1 / 15); // 15 단계로 스케일링
    const radius = maxRadius * Math.pow(scaleFactor, newCenter.zoom - 6);

    searchPhotos(newCenter.lng, newCenter.lat, radius); // lon, lat, radius

    CenterChangeTimeout = setTimeout(() => {
      CenterChangeTimeout = null; // 3초 후 제한 해제
    }, 500);
  };

  //현재위치 이동 버튼 클릭 시
  const moveToCurrentLocation = async () => {
    const currentLatLng = await getCurrentLocation();
    const newCenter = new (window as any).naver.maps.LatLng(
      currentLatLng.lat,
      currentLatLng.lng
    );
    setCurrentPosition(currentLatLng);
    if (mapInstance.current) {
      mapInstance.current.panTo(newCenter); // 부드럽게 중심 이동
    }
  };

  const ClickImageMarker = (
    recordId: string,
    photoId: string,
    isDetailPhoto: boolean,
    isSelect?: boolean
  ) => {
    // 선택된 이미지 마커의 photoId를 받아와서 처리하는 함수
    // console.log('Click Image Marker:', recordId);
    //현재위치
    if (isDetailPhoto && isSelect) {
      // 상세 조회 상태에서의 자기 자신 클릭
      changeALLPhotoRecordIsSelectfalse();
      setIsSerachDetailRecord(false);
      recordingInfo.isSerching = false;
    } else if (isDetailPhoto && !isSelect) {
      // 상세 조회 상태에서의 다른 이미지 클릭
      changeALLPhotoRecordIsSelectfalse();
      changePhotoRecordIsSelect(photoId);
    } else if (!isDetailPhoto) {
      // 조회 상태에서의 클릭
      // console.log('photoId', photoId);
      searchRecord(recordId).then(() => {
        changeALLPhotoRecordIsSelectfalse();
        changePhotoRecordIsSelect(photoId);
      });
      recordingInfo.isSerching = true;
      setIsSerachDetailRecord(true);
    }
  };

  useEffect(() => {
    // console.log(`선택된 박스 인덱스가 변경됨: ${selectedBoxIndex}`);

    const routeRecordStore = useRouteRecordStore.getState();
    if (selectedBoxIndex === 0) {
      routeRecordStore.setRecordingInfo({
        ...routeRecordStore.recordingInfo,
        isRenderingRecording: false,
      });
    } else {
      searchRecord(routeRecordStore.recordingInfo.recordId);
      routeRecordStore.setRecordingInfo({
        ...routeRecordStore.recordingInfo,
        isRenderingRecording: true,
      });
    }
  }, [selectedBoxIndex]); // selectedBoxIndex가 변경될 때마다 실행됨

  const handleSelectBoxClick = (index: number) => {
    if (index == 1 && !recordingInfo.isRecording) return; // ✅ recordingInfo.isRecording이 false면 클릭 방지
    setSelectedBoxIndex(index);
  };

  useEffect(() => {
    if (!recordingInfo.isRecording) {
      setSelectedBoxIndex(0);
    } else {
      setSelectedBoxIndex(1);
      moveToCurrentLocation();
      if (mapInstance.current) mapInstance.current.setZoom(18); // 줌 레벨 설정
    }
  }, [recordingInfo.isRecording]);

  return (
    <>
      <div
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        ref={mapElement}
      >
        {mapInstance.current && currentPosition && (
          <>
            {/* 현재 위치 마커 */}
            {!loading && (
              <MainMarker
                position={currentPosition}
                mapInstance={mapInstance.current}
              />
            )}
            {/* 집 위치 마커 */}
            {userInfo?.lat && userInfo?.lng && (
              <HomeMarker
                position={{ lat: userInfo.lat, lng: userInfo.lng }}
                mapInstance={mapInstance.current}
              />
            )}
            {/* 조회 기록 셀렉트 박스 */}
            {!isSearchDetailRecord && (
              <SelectBox
                leftText="조회"
                rightText="기록"
                selectedBoxIndex={selectedBoxIndex}
                setSelectedBoxIndex={handleSelectBoxClick}
              />
            )}
            {/* 전체 조회 사진 마커 */}
            {selectedBoxIndex === 0 && !isSearchDetailRecord && (
              <>
                {photos.map((photo) => (
                  <ImageMarker
                    key={photo.photoId}
                    position={{ lat: photo.lat, lng: photo.lng }}
                    mapInstance={mapInstance.current}
                    imageSrc={photo.url}
                    isSelect={false}
                    ClickImageMarker={() => {
                      ClickImageMarker(
                        photo.recordId,
                        photo.photoId,
                        false,
                        false
                      );
                    }}
                  />
                ))}
              </>
            )}

            {/* 상세 조회 마커 */}
            {(isSearchDetailRecord || selectedBoxIndex == 1) && record && (
              <>
                {record.routeRecords?.map((routeRecord) => (
                  <Polyline
                    key={routeRecord.routeId}
                    path={routeRecord.coordinates.map((coordinate) => ({
                      lat: coordinate.lat,
                      lng: coordinate.lng,
                    }))}
                    mapInstance={mapInstance.current}
                  />
                ))}
                {record.photoRecords?.map((photo) => (
                  <ImageMarker
                    key={photo.photoId}
                    position={{ lat: photo.lat, lng: photo.lng }}
                    mapInstance={mapInstance.current}
                    imageSrc={photo.images?.[0]?.url}
                    isSelect={photo.isSelect}
                    ClickImageMarker={() => {
                      ClickImageMarker(
                        record.recordId,
                        photo.photoId,
                        true,
                        photo.isSelect
                      );
                    }}
                  />
                ))}
                {/* 기록 요약 아이콘 */}
                {selectedBoxIndex == 0 && (
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 flex justify-center items-start mt-[4%]"
                    style={{ zIndex: 1000 }}
                  >
                    <IconRecordInfo
                      title={record.recordName}
                      number={record.photoRecords?.length ?? 0}
                      width={
                        record.recordName.length > 10
                          ? 'width: 800'
                          : 'width: 200'
                      }
                    />
                  </div>
                )}
                {/* 기록 카드 */}
                {selectedBoxIndex == 0 && record.photoRecords && (
                  <PhotoRecordSlider photoRecords={record.photoRecords} />
                )}
              </>
            )}
          </>
        )}
      </div>
      {/* 현재 위치 버튼 */}
      <CurrentLocationButton
        isSearchDetailRecord={isSearchDetailRecord}
        onMoveToCurrentLocation={moveToCurrentLocation}
      />
      {/* 검색 버튼 */}
      <SearchButton />
    </>
  );
};

export default NaverMapComponent;
