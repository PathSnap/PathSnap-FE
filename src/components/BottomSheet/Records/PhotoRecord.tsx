import React from 'react';
import RecordWrapper from './RecordWrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../css/PhotoSlider.css';
import IconContent from '../../../icons/BottomSheeet/IconContent';
import useModalStore from '../../../stores/ModalStore';
interface PhotoRecordProps {
  isPhotoRecord?: boolean;
}

const PhotoRecord: React.FC<PhotoRecordProps> = ({ isPhotoRecord }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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
          <div className={'grid place-items-center'}>
            <img src="/icons/apple-icon-180.png" className={'object-cover'} />
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
        {/* 이미지 위의 요소들 */}
        <div className={'w-full absolute flex justify-between top-0 z-20 p-3'}>
          <div className={'text-white'}>
            <div className={'font-bold text-sm'}>장소이름</div>
            <div className={'text-xs'}>18:20</div>
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
