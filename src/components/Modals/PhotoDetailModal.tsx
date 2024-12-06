import React from 'react';
import ModalWrapper from './ModalWrapper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../css/PhotoSlider.css';
import IconCancel from '../../icons/IconCancel';
import useModalStore from '../../stores/Modals/ModalStore';
import useSelectedPhotoStore from '../../stores/Modals/SelectedPhotoStore';

const PhotoDetailModal: React.FC = () => {
  const { closeModal } = useModalStore();
  const { selectedRecord } = useSelectedPhotoStore();
  var settings = {
    dots: selectedRecord.images.length > 1 ? true : false,
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
          bottom: '15px',
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
  return (
    <ModalWrapper classProp="w-full h-fit flex flex-col">
      {/* 슬라이더 */}
      <div className="h-[380px] w-[380px] mb-[14px] relative">
        <IconCancel onClick={closeModal} className="fixed top-5 right-[10px]" />
        <Slider {...settings}>
          {selectedRecord.images.map((image: any) => (
            <div
              className={'grid place-items-center focus:outline-none'}
              key={image.url}
            >
              <img
                src={image.url}
                className={'object-contain w-full h-[380px]'}
                //className={'object-contain w-full h-[170px] rounded-2xl'}
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* 내용 */}
      <div className={'flex flex-col w-[380px] text-white text-sm'}>
        <div className={'text-base font-bold mb-1.5'}>
          {selectedRecord.photoTitle}
        </div>
        <div className={'flex gap-2.5 mb-2.5'}>
          <div>{selectedRecord.photoDate.slice(0, 10)}</div>
          {/* TODO : 장소 추가되면 장소로 변경 */}
          <div>장소</div>
        </div>
        <div className="break-keep">{selectedRecord.photoContent}</div>
      </div>
    </ModalWrapper>
  );
};

export default PhotoDetailModal;
