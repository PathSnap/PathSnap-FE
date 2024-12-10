import React, { useState, useRef, useEffect } from 'react';
import { HeaderBar } from './RegisterPage';
import IconCamera from '../icons/ProfilePage/IconCamera';
import ProfileForm from '../components/Profile/ProfileForm';
import { useNavigate } from 'react-router';
import uploadS3 from '../apis/Photos/uploadS3';
import useUserInfoStore from '../stores/UserInfo';

const EditProfilePage: React.FC = () => {
  const [isFill, setIsFill] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [lastImg, setLastImg] = useState<string>('');
  const router = useNavigate();

  const handleClickSaveBtn = async () => {
    if (lastImg) {
      const imageId = await saveImg(lastImg);
      setImageValue(imageId);
    }
    setIsSubmit(true);
  };

  const saveImg = async (lastImg: any) => {
    console.log(lastImg);
    const byteCharacters = atob(lastImg.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('images', blob, 'profile-image.jpg');

    const res = await uploadS3(formData);
    return res.images[0].imageId;
  };

  return (
    <div className={'w-full h-full px-9 relative text-second flex flex-col'}>
      <HeaderBar headerText="프로필 수정" />
      <div className={'pt-24 gap-[30px] flex flex-col relative'}>
        <ProfileImage setLastImg={setLastImg} />
        <ProfileForm
          setIsFill={setIsFill}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          imageValue={imageValue}
        />
      </div>
      <div className={'flex gap-4 py-[50px]'}>
        <button
          onClick={() => router('/profile')}
          className={'w-full h-[58px] text-lg gray-button'}
        >
          취소
        </button>
        <button
          onClick={handleClickSaveBtn}
          className={`w-full h-[58px] text-lg ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장
        </button>
      </div>
      <div className={'text-center py-9'}>탈퇴하기</div>
    </div>
  );
};

export default EditProfilePage;

interface ProfileImageProps {
  setLastImg: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ setLastImg }) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const { userInfo } = useUserInfoStore((state) => state);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImagePreview(base64Image); // 미리보기 이미지 설정
        setLastImg(base64Image); // 저장할 이미지 설정
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!imagePreview) {
      // setLastImg(userInfo.images?.[0]?.url || '');
      setImagePreview(userInfo.images?.[0]?.url || '');
    }
  }, [imagePreview]);

  return (
    <div className={'w-full grid place-items-center'}>
      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        className="hidden" // 숨김 처리
        onChange={handleFileChange}
      />
      <div
        className="w-[120px] aspect-square rounded-full bg-cover bg-center relative cursor-pointer"
        style={{
          backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
        }}
        onClick={() => uploadRef.current?.click()}
      >
        <div className="w-full h-full rounded-full bg-black/30 absolute top-0 left-0 grid place-items-center">
          <IconCamera />
        </div>
      </div>
    </div>
  );
};
