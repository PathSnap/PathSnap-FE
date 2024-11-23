import React from 'react';
// import useModalStore from '../../stores/ModalStore';
import ModalWrapper from './ModalWrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/PhotoSlider.css';

const PhotoDetailModal: React.FC = () => {
  // const { closeModal } = useModalStore();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <ModalWrapper classProp="w-full h-fit flex flex-col">
      {/* 슬라이더 */}
      <div className="h-[380px] w-[380px] mb-[14px]">
        <Slider {...settings}>
          <div className={'grid place-items-center'}>
            <img src="/cute.png" className={'object-cover'} />
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
      </div>
      {/* 내용 */}
      <div className={'flex flex-col w-[380px] text-white text-sm'}>
        <div className={'text-base font-bold mb-1.5'}>즐거운 여행</div>
        <div className={'flex gap-2.5 mb-2.5'}>
          <div>2024.11.22</div>
          <div>어딘가에서</div>
        </div>
        <div className="break-keep">
          오늘 전주로 여행을 떠났다. 전주 한옥마을에 도착하자마자 고즈넉한
          분위기와 전통 건축물들이 나를 반겨준다. 골목길을 걸으며 떡갈비와
          비빔밥 같은 전주의 맛있는 음식들도 맛보았다. 오목대에 올라 시내를
          내려다보니 전주의 아름다움이 한눈에 들어왔다. 여유로운 하루를 보내며,
          전주가 주는 따뜻한 감성을 마음에 담고 돌아간다.
        </div>
      </div>
    </ModalWrapper>
  );
};

export default PhotoDetailModal;
