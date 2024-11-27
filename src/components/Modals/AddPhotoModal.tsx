import React, { useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';
import useModalStore from '../../stores/ModalStore';
import IconPlus from '../../icons/BottomSheeet/IconPlus';
import Input from '../Input';

const AddPhotoModal: React.FC = () => {
  const [isFill, setIsFill] = useState(false);
  const { closeModal } = useModalStore();
  const [isSubmit, setIsSubmit] = useState(false);
  const errorStyle = 'text-xxs';

  const [recordInfo, setRecordInfo] = useState({
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

  const handleSubmit = () => {
    const hasErrors = validateFields();

    if (!hasErrors) {
      // 회원가입 api 또는 프로필 수정 api 호출
    }
  };

  const handleInputChange = (field: keyof typeof recordInfo, value: string) => {
    setRecordInfo((prev) => ({ ...prev, [field]: value }));
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
          photos={recordInfo.photos}
          setValue={(value) => handleInputChange('photos', value)}
          error={errors.photos}
          isSubmit={isSubmit}
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
          type="date"
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
            console.log(recordInfo);
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
  photos: string[];
  setValue: (value: string) => void;
  error: boolean;
  isSubmit: boolean;
}

const AddPhoto: React.FC<AddPhotoProps> = ({ photos, error, isSubmit }) => {
  return (
    <>
      <div className={'font-semibold pb-0.5'}>사진추가</div>
      <div className={'relative flex flex-col w-full'}>
        <div className={'font-semibold text-xs flex items-center'}>
          <div>사진</div>
          <div className={'text-[10px]'}>(최대 5장)</div>
        </div>
        <Photos photoUrls={photos} />
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
  photoUrls: string[];
}
const Photos: React.FC<PhotosProps> = ({ photoUrls }) => {
  return (
    <div className={'flex gap-3 overflow-x-auto w-full p-1'}>
      {photoUrls.map((photoUrl) => (
        <Photo key={photoUrl} photoSrc={photoUrl} />
      ))}
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
