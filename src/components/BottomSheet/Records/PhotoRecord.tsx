import React from 'react';
import RecordWrapper from './RecordWrapper';
import IconDrag from '../../../icons/BottomSheeet/IconDrag';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../css/PhotoSlider.css';

const PhotoRecord: React.FC = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <RecordWrapper>
      <div
        className={'w-full h-[170px] rounded-2xl relative overflow-x-hidden'}
      >
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
        {/* <img
          src="/icons/apple-icon-180.png"
          className={'w-full h-full object-cover'}
        /> */}
        {/* 이미지 위의 요소들 */}
        <div className={'absolute right-3 top-3 z-20'}>
          <IconDrag />
        </div>
        <div className={'absolute bottom-3 left-3 text-white text-xs z-20'}>
          <div className={'font-bold'}>장소이름</div>
          <div>2024.11.03</div>
        </div>
      </div>
    </RecordWrapper>
  );
};

export default PhotoRecord;