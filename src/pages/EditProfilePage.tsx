import React, { useEffect, useState } from 'react';
import { HeaderBar } from './RegisterPage';
import Input from '../components/Input';
import AddressSearchModal from '../components/Modals/AddressSearchModal';
import IconCamera from '../icons/ProfilePage/IconCamera';

const EditProfilePage: React.FC = () => {
  const labelStyle = 'text-base font-semibold';
  const inputStyle = 'h-[54px]';
  const [isFill, setIsFill] = useState(false);
  const [info, setInfo] = useState({
    name: '',
    birth: '',
    phoneNum: '',
    address: '',
  });

  useEffect(() => {
    if (info.name && info.birth && info.phoneNum && info.address) {
      setIsFill(true);
    } else {
      setIsFill(false);
    }
  }, [info.name, info.birth, info.phoneNum, info.address]);

  return (
    <div className={'w-full h-full px-9 relative text-second flex flex-col'}>
      <HeaderBar headerText="프로필 수정" />
      <div className={'pt-24 gap-[30px] flex flex-col flex-grow relative'}>
        <img
          src="/cute.png"
          className="w-20 aspect-square rounded-full place-self-center"
        />
        <div
          className={
            'w-20 aspect-square rounded-full bg-black/30 absolute left-1/2 -translate-x-1/2 grid place-items-center'
          }
        >
          <IconCamera />
        </div>
        <Input
          label="이름"
          placeholder="예) 홍길동"
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          value={info.name}
          setValue={(value) => setInfo({ ...info, name: value })}
        />
        <Input
          label="생년월일"
          placeholder="생년월일 선택"
          type="date"
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          value={info.birth}
          setValue={(value) => setInfo({ ...info, birth: value })}
        />
        <Input
          label="전화번호"
          placeholder="-를 제외하고 입력"
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          value={info.phoneNum}
          setValue={(value) => setInfo({ ...info, phoneNum: value })}
        />
        {/* 주소 입력 */}
        <AddressInput
          value={info.address}
          setValue={(value) => setInfo({ ...info, address: value })}
        />
      </div>
      {/* 버튼 */}
      <div className={'flex gap-4 py-10'}>
        <button className={'w-full h-[58px] text-lg gray-button'}>취소</button>
        <button
          className={`w-full h-[58px] text-lg ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;
interface AddressInputProps {
  value: string;
  setValue: (value: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ value, setValue }) => {
  const [modalState, setModalState] = useState(false);
  const openAddressSearch = () => {
    setModalState(true);
  };
  const closeAddressSearch = () => {
    setModalState(false);
  };
  const onCompletePost = (data: any) => {
    setModalState(false);
    setValue(data.address);
  };
  return (
    <>
      <div className={'flex flex-col gap-1.5 w-full relative'}>
        <div className={'text-base font-semibold'}>주소</div>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          disabled={true}
          className={
            'w-full rounded-[10px] bg-[#F5F5F5] pl-3 pr-28 focus:outline focus:outline-1 focus:outline-primary h-[54px]'
          }
          placeholder="기본주소"
        />
        <button
          onClick={openAddressSearch}
          className={
            'absolute w-[88px] h-11 right-3 top-[35px] rounded-xl border border-primary text-primary font-semibold'
          }
        >
          주소 검색
        </button>
      </div>
      {modalState && (
        <AddressSearchModal
          onCompletePost={onCompletePost}
          closeAddressSearch={closeAddressSearch}
        />
      )}
    </>
  );
};