import React, { useEffect, useState } from 'react';
import Input from '../Input';
import AddressInput from './AddressInput';
import useUserInfoStore from '../../stores/UserInfo';
import { useNavigate } from 'react-router';

interface ProfileFormProps {
  isRegisterPage?: boolean;
  setIsFill: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  imageValue?: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  isRegisterPage = false,
  setIsFill,
  isSubmit,
  setIsSubmit,
  imageValue = '',
}) => {
  const labelStyle = 'text-base font-semibold';
  const inputStyle = 'h-[54px]';
  const { userInfo } = useUserInfoStore();

  const [info, setInfo] = useState({
    name: '',
    birth: '',
    phoneNum: '',
    address: '',
    imageId: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    birth: false,
    phoneNum: false,
    address: false,
  });

  const validateFields = () => {
    const newErrors = {
      name: !info.name,
      birth: !info.birth,
      phoneNum: !info.phoneNum,
      address: !info.address,
    };

    setErrors(newErrors);

    // 에러가 하나라도 있으면 true 반환
    return Object.values(newErrors).some((error) => error);
  };

  const { updateUserInfo } = useUserInfoStore();
  const router = useNavigate();

  const handleSubmit = async () => {
    const hasErrors = validateFields();
    console.log(hasErrors, isSubmit);

    if (!hasErrors && isSubmit) {
      setIsSubmit(false);
      try {
        await updateUserInfo({
          userId: localStorage.getItem('userId')!,
          userName: info.name,
          birthDate: info.birth,
          phoneNumber: info.phoneNum,
          address: info.address,
          imageId: imageValue || '',
        });
        if (isRegisterPage) {
          router('/');
        } else {
          router('/profile');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleInputChange = (field: keyof typeof info, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
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
    if (info.name && info.birth && info.phoneNum && info.address) {
      setIsFill(true);
    } else {
      setIsFill(false);
    }
  }, [info.name, info.birth, info.phoneNum, info.address]);

  useEffect(() => {
    if (!isRegisterPage) {
      setInfo({
        name: userInfo.userName,
        birth: userInfo.birthDate,
        phoneNum: userInfo.phoneNumber,
        address: userInfo.address,
        imageId: userInfo?.images?.[0]?.imageId || '',
      });
    }
  }, [isRegisterPage]);

  return (
    <form
      className={`gap-[30px] flex flex-col flex-grow ${isRegisterPage && 'pt-24'}`}
    >
      <Input
        label="이름"
        placeholder="예) 홍길동"
        labelStyle={labelStyle}
        inputStyle={inputStyle}
        value={info.name}
        setValue={(value) => handleInputChange('name', value)}
        error={errors.name}
        isSubmit={isSubmit}
      />
      <Input
        label="생년월일"
        placeholder="생년월일 선택"
        type="date"
        labelStyle={labelStyle}
        inputStyle={inputStyle}
        value={info.birth}
        setValue={(value) => handleInputChange('birth', value)}
        error={errors.birth}
        isSubmit={isSubmit}
      />
      <Input
        label="전화번호"
        placeholder="-를 제외하고 입력"
        type="tel"
        labelStyle={labelStyle}
        inputStyle={inputStyle}
        value={info.phoneNum}
        setValue={(value) => handleInputChange('phoneNum', value)}
        error={errors.phoneNum}
        isSubmit={isSubmit}
      />
      <AddressInput
        isRegisterPage={isRegisterPage}
        value={info.address}
        setValue={(value) => handleInputChange('address', value)}
        error={errors.address}
        isSubmit={isSubmit}
      />
    </form>
  );
};

export default ProfileForm;
