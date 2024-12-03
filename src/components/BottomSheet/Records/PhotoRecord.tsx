import React, { useEffect } from 'react';
import RecordWrapper from './RecordWrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../css/PhotoSlider.css';
import IconContent from '../../../icons/BottomSheeet/IconContent';
import useModalStore from '../../../stores/ModalStore';
interface PhotoRecordProps {
  isPhotoRecord?: boolean;
  record: any;
}

const PhotoRecord: React.FC<PhotoRecordProps> = ({ isPhotoRecord, record }) => {
  var settings = {
    // dots: true,
    dots: record.images.length > 1 ? true : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  useEffect(() => {
    console.log(record);
  }, []);

  const { openModal } = useModalStore();

  return (
    <RecordWrapper isPhotoRecord={isPhotoRecord}>
      <div className={'w-full h-[170px] rounded-2xl relative'}>
        {/* 오버레이 */}
        <div
          style={{ pointerEvents: 'none' }}
          className={
            'w-full h-full bg-black bg-opacity-15 absolute rounded-2xl z-10'
          }
        ></div>
        {/* 나중에 요소 하나이면 점 안보이도록 설정하기 */}
        <Slider {...settings}>
          {record.images.map((image: any) => (
            <div
              key={image.url}
              className={
                'grid place-items-center relative rounded-2xl overflow-hidden'
              }
            >
              <div
                className={
                  'absolute w-full h-[170px] bg-center bg-no-repeat bg-cover rounded-2xl filter blur-md -z-10'
                }
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              ></div>
              <img
                src={image.url}
                className={'object-contain w-full h-[170px] rounded-2xl'}
              />
            </div>
          ))}
        </Slider>
        {/* 이미지 위의 요소들 */}
        <div className={'w-full absolute flex justify-between top-0 z-20 p-3'}>
          <div className={'text-white'}>
            <div className={'font-bold text-sm'}>{record.photoTitle}</div>
            <div className={'text-xs'}>{record.photoDate.slice(11, 16)}</div>
          </div>
          <IconContent
            onClick={() => {
              openModal('photoDetailModal');
            }}
          />
        </div>
      </div>
    </RecordWrapper>
  );
};

export default PhotoRecord;
