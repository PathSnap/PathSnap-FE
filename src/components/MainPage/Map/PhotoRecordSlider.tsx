import React, { useMemo, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlaceCard from './PlaceCard'; // PlaceCard 컴포넌트를 임포트합니다.
import useRecordStore from '../../../stores/RecordStore'; // RecordStore 임포트

interface PhotoRecordSliderProps {
  photoRecords: any[]; // 사진 레코드 배열
}

const PhotoRecordSlider: React.FC<PhotoRecordSliderProps> = ({
  photoRecords,
}) => {
  const { changeALLPhotoRecordIsSelectfalse, changePhotoRecordIsSelect } =
    useRecordStore(); // Store에서 상태 업데이트 함수 가져오기

  const sliderRef = useRef<Slider | null>(null);

  // `isSelect`가 true인 슬라이드의 초기 인덱스를 계산
  const initialSlideIndex = useMemo(() => {
    const selectedIndex = photoRecords.findIndex((photo) => photo.isSelect);
    return selectedIndex !== -1 ? selectedIndex : 0; // 없으면 0으로 설정
  }, [photoRecords]);

  // 슬라이더 초기 위치 동기화
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(initialSlideIndex);
    }
  }, [initialSlideIndex]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (currentIndex: number) => {
      // 현재 슬라이드의 photoId를 가져와서 상태 업데이트
      const currentPhoto = photoRecords[currentIndex];
      if (currentPhoto) {
        changeALLPhotoRecordIsSelectfalse();
        changePhotoRecordIsSelect(currentPhoto.photoId);
      }
      // console.log('Current Slide Index:', currentIndex);
      // console.log('Current Photo:', currentPhoto);
    },
  };

  return (
    <div
      className="w-full h-[140px] relative absolute bottom-[150px]"
      style={{ zIndex: 1000, position: 'fixed' }}
    >
      <Slider ref={sliderRef} {...settings}>
        {photoRecords.map((photo) => (
          <div key={photo.photoId} className="px-4">
            <PlaceCard
              name={photo.photoTitle}
              description={photo.photoContent}
              date={photo.photoDate}
              imageUrl={photo.images?.[0]?.url ?? ''}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoRecordSlider;
