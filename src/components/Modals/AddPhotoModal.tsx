import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import useModalStore from '../../stores/ModalStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';

const AddPhotoModal: React.FC = () => {
  const [isFill, _] = useState(false);
  const { closeModal } = useModalStore();
  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-[30px] pt-5 pb-7 gap-[18px] text-second">
      <div className={'font-semibold'}>사진추가</div>
      <div className={'flex flex-col w-full'}>
        <div className={'font-semibold text-xs flex items-center'}>
          <div>사진</div>
          <div className={'text-[10px]'}>(최대 5장)</div>
        </div>
        <Photos />
      </div>
      {/* <div>제목</div> */}
      <Input label="제목" placeholder="제목을 입력해주세요." />
      <Input label="날짜" placeholder="날짜를 입력해주세요." type="date" />
      <Input label="장소" placeholder="장소를 입력해주세요." />
      <div className={'flex flex-col gap-1.5 text-xs w-full'}>
        <div>내용</div>
        <textarea
          className={
            'w-full h-20 rounded-[10px] bg-[#F0F0F0] px-3 py-2 focus:outline focus:outline-1 focus:outline-primary'
          }
          maxLength={80}
          placeholder="내용을 입력해주세요. (최대 80자)"
        />
      </div>
      <div className={'flex justify-between w-full font-semibold'}>
        <button
          className={'w-[127px] h-11 gray-button'}
          onClick={() => {
            closeModal();
          }}
        >
          취소
        </button>
        <button
          className={`w-[127px] h-11 rounded-2xl  ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장
        </button>
      </div>
    </ModalWrapper>
  );
};
const Photos: React.FC = () => {
  return (
    <div className={'flex gap-3 overflow-x-auto w-full pt-1.5 pb-1'}>
      <Photo photoSrc="/icons/apple-icon-180.png" />
      {/* 사진추가 */}
      <div
        className={
          'w-20 aspect-square rounded-[10px] grid place-items-center shadow-xxs'
        }
      >
        <IconPlus width={13.33} height={13.33} />
      </div>
    </div>
  );
};

interface PhotoProps {
  photoSrc: string;
}
const Photo: React.FC<PhotoProps> = ({ photoSrc }) => {
  return (
    <div className={'relative'}>
      <img
        src={photoSrc}
        className={'w-20 aspect-square rounded-[10px] border-2 border-primary'}
      />
      <div
        className={
          'absolute w-4 aspect-square rounded-full bg-primary grid place-items-center -top-1 -right-0.5'
        }
      >
        <div className={'bg-white w-2 h-0.5 rounded-full'}></div>
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text' }) => {
  return (
    <div className={'flex flex-col gap-1.5 text-xs w-full relative'}>
      <div>{label}</div>
      <input
        className={
          'w-full h-10 rounded-[10px] bg-[#F0F0F0] px-3 focus:outline focus:outline-1 focus:outline-primary'
        }
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default AddPhotoModal;
