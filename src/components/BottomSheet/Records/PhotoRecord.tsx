import React from 'react';
import RecordWrapper from './RecordWrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../css/PhotoSlider.css';
import IconContent from '../../../icons/BottomSheeet/IconContent';
import useModalStore from '../../../stores/Modals/ModalStore';
import useSelectedPhotoStore from '../../../stores/Modals/SelectedPhotoStore';
import { photoRecord } from '../../../stores/RecordStore';
interface PhotoRecordProps {
  isPhotoRecord?: boolean;
  record: photoRecord;
}

const PhotoRecord: React.FC<PhotoRecordProps> = ({ isPhotoRecord, record }) => {
  var settings = {
    dots: record.images.length > 1 ? true : false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots: any) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  const { openModal } = useModalStore();
  const { setSelectedRecord } = useSelectedPhotoStore();

  return (
    <RecordWrapper isPhotoRecord={isPhotoRecord} record={record}>
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
                'grid place-items-center relative rounded-2xl overflow-hidden focus:outline-none'
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
              setSelectedRecord(record);
            }}
          />
        </div>
      </div>
    </RecordWrapper>
  );
};

export default PhotoRecord;
