import React, { useEffect, useRef, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import useModalStore from '../../stores/ModalStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';
import Input from '../Input';
import useUploadImg from '../../hooks/BottomSheet/useUploadImg';
import { api } from '../../utils/api';
import uploadS3 from '../../apis/Photos/uploadS3';
import { formattedDate } from '../../utils/formatDate';
import useRecordStore from '../../stores/RecordStore';

const AddPhotoModal: React.FC = () => {
  const [isFill, setIsFill] = useState(false);
  const { closeModal } = useModalStore();
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const recordId = useRecordStore((state) => state.recordId);

  const errorStyle = 'text-xxs';

  type recordInfo = {
    photos: string[];
    title: string;
    date: string;
    location: string;
    content: string;
  };

  const [recordInfo, setRecordInfo] = useState<recordInfo>({
    photos: [],
    title: '',
    date: '',
    location: '',
    content: '',
  });

  const [errors, setErrors] = useState({
    photos: false,
    title: false,
    date: false,
    location: false,
    content: false,
  });

  const validateFields = () => {
    const newErrors = {
      photos: !recordInfo.photos.length,
      title: !recordInfo.title,
      date: !recordInfo.date,
      location: !recordInfo.location,
      content: !recordInfo.content,
    };

    setErrors(newErrors);

    // 에러가 하나라도 있으면 true 반환
    return Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    const hasErrors = validateFields();

    if (!hasErrors && isFill && isSubmit) {
      try {
        // S3에 이미지 업로드
        const imgData = await uploadS3(formData);
        if (!imgData || !imgData.images) {
          throw new Error('S3 업로드 실패');
        }

        // S3 업로드 결과 처리
        const imageIds = imgData.images.map((image: any) => ({
          imageId: image.imageId,
        }));

        // TODO: 순서에 맞게 수정하기
        const seq = 0;
        const lat = 0;
        const lng = 0;

        // 이미지 정보 저장 요청
        const res = await api.post(`photos/create/${recordId}`, {
          seq,
          images: imageIds,
          photoTitle: recordInfo.title,
          photoContent: recordInfo.content,
          photoDate: formattedDate() + ' ' + recordInfo.date + ':00',
          lat,
          lng,
        });

        console.log('이미지 정보 저장 성공:', res);

        // 모달 닫기
        closeModal();
      } catch (error) {
        console.error('요청 중 오류 발생:', error);
      }
    }
  };

  const handleInputChange = (
    field: keyof typeof recordInfo,
    value: string | string[]
  ) => {
    setRecordInfo((prev) => {
      if (field === 'photos') {
        return {
          ...prev,
          photos: Array.isArray(value) ? value : [value],
        };
      }
      return { ...prev, [field]: value };
    });

    // 입력값 변경 시 에러 제거
    if (value) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: true }));
    }
  };

  useEffect(() => {
    if (isSubmit) {
      handleSubmit();
    }
  }, [isSubmit]);

  useEffect(() => {
    if (
      recordInfo.photos.length &&
      recordInfo.title &&
      recordInfo.date &&
      recordInfo.location &&
      recordInfo.content
    ) {
      setIsFill(true);
    } else {
      setIsFill(false);
    }
  }, [
    recordInfo.photos,
    recordInfo.title,
    recordInfo.date,
    recordInfo.location,
    recordInfo.content,
  ]);

  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-[30px] pt-5 pb-7 text-second">
      <form
        className={
          'w-full h-full flex flex-col justify-center items-center gap-[18px]'
        }
      >
        <AddPhoto
          value={recordInfo.photos}
          setValue={(value) => handleInputChange('photos', value)}
          error={errors.photos}
          isSubmit={isSubmit}
          setFormData={setFormData}
        />
        <Input
          label="제목"
          placeholder="제목을 입력해주세요."
          value={recordInfo.title}
          setValue={(value) => handleInputChange('title', value)}
          error={errors.title}
          errorStyle={errorStyle}
          isSubmit={isSubmit}
        />
        <Input
          label="날짜"
          placeholder="날짜를 입력해주세요."
          type="time"
          value={recordInfo.date}
          setValue={(value) => handleInputChange('date', value)}
          error={errors.date}
          errorStyle={errorStyle}
          isSubmit={isSubmit}
        />
        <Input
          label="장소"
          placeholder="장소를 입력해주세요."
          value={recordInfo.location}
          setValue={(value) => handleInputChange('location', value)}
          error={errors.location}
          errorStyle={errorStyle}
          isSubmit={isSubmit}
        />
        <ContentInput
          value={recordInfo.content}
          setValue={(value) => handleInputChange('content', value)}
          error={errors.content}
          isSubmit={isSubmit}
        />
      </form>
      <div className={'flex justify-between w-full font-semibold pt-[30px]'}>
        <button
          className={'w-[127px] h-11 gray-button'}
          onClick={() => {
            closeModal();
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            setIsSubmit(true);
          }}
          type="submit"
          className={`w-[127px] h-11 rounded-2xl  ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장
        </button>
      </div>
    </ModalWrapper>
  );
};

interface AddPhotoProps {
  value: string[];
  setValue: (value: string[]) => void;
  error: boolean;
  isSubmit: boolean;
  setFormData: (value: FormData) => void;
}

const AddPhoto: React.FC<AddPhotoProps> = ({
  error,
  isSubmit,
  setValue,
  value,
  setFormData,
}) => {
  return (
    <>
      <div className={'font-semibold pb-0.5'}>사진추가</div>
      <div className={'relative flex flex-col w-full'}>
        <div className={'font-semibold text-xs flex items-center'}>
          <div>사진</div>
          <div className={'text-[10px]'}>(최대 5장)</div>
        </div>
        <Photos setValue={setValue} value={value} setFormData={setFormData} />
        {isSubmit && error && (
          <div
            className={`absolute top-full pt-0.5 text-error font-semibold text-xxs`}
          >
            필수 입력 항목입니다.
          </div>
        )}
      </div>
    </>
  );
};

interface PhotosProps {
  setValue: (value: string[]) => void;
  value: string[];
  setFormData: (value: FormData) => void;
}
const Photos: React.FC<PhotosProps> = ({ setValue, value, setFormData }) => {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const { photoUrls, handleFileChange, setPhotoUrls, formData } = useUploadImg(
    (imageData) => {
      setValue(imageData);
    }
  );

  useEffect(() => {
    if (formData) {
      setFormData(formData);
    }
  }, [formData, setFormData]);

  const deletePhoto = (index: number) => {
    const newPhotos = value.filter((_, i) => i !== index);
    setPhotoUrls(newPhotos);
  };

  return (
    <div className={'flex gap-3 overflow-x-auto w-full p-1'}>
      {photoUrls.map((photoUrl, index) => (
        <Photo
          key={Date.now() + index}
          index={index}
          photoSrc={photoUrl}
          deletePhoto={deletePhoto}
        />
      ))}
      <div className={'relative shadow-xxs rounded-[10px]'}>
        {/* 사진추가 아이콘 */}
        <input
          ref={uploadRef}
          className={
            'relative w-20 aspect-square rounded-[10px] grid place-items-center focus:outline-none opacity-0 cursor-pointer'
          }
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            handleFileChange(e);
            setValue(photoUrls);
          }}
        />
        <IconPlus
          width={13.33}
          height={13.33}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
};

interface PhotoProps {
  photoSrc: string;
  deletePhoto: (index: number) => void;
  index: number;
}
const Photo: React.FC<PhotoProps> = ({ photoSrc, deletePhoto, index }) => {
  return (
    <div className={'relative flex-shrink-0'}>
      <img
        src={photoSrc}
        className={'w-20 aspect-square rounded-[10px] border-2 border-primary '}
      />
      {/* 사진 삭제하는 버튼 */}
      <div
        onClick={() => {
          deletePhoto(index);
        }}
        className={
          'absolute w-4 aspect-square rounded-full bg-primary grid place-items-center -top-1 -right-0.5'
        }
      >
        <div className={'bg-white w-2 h-0.5 rounded-full'}></div>
      </div>
    </div>
  );
};

interface ContentInputProps {
  value: string;
  setValue: (value: string) => void;
  error: boolean;
  isSubmit: boolean;
}

const ContentInput: React.FC<ContentInputProps> = ({
  value,
  setValue,
  error,
  isSubmit,
}) => {
  return (
    <div className={'relative flex flex-col gap-1.5 text-xs w-full'}>
      <div>내용</div>
      <textarea
        style={
          isSubmit && error
            ? {
                outlineColor: '#FFB4B4',
                outlineWidth: '1px',
                outlineStyle: 'solid',
                boxShadow: '0px 0px 8px rgba(255, 180, 180, 0.5)',
              }
            : {}
        }
        className={
          'relative w-full h-20 rounded-[10px] bg-[#F0F0F0] px-3 py-2 focus:outline focus:outline-1 focus:outline-primary'
        }
        maxLength={80}
        placeholder="내용을 입력해주세요. (최대 80자)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isSubmit && error && (
        <div
          className={`absolute top-full pt-0.5 text-error font-semibold text-xxs`}
        >
          필수 입력 항목입니다.
        </div>
      )}
    </div>
  );
};

export default AddPhotoModal;
