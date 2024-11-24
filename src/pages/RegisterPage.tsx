import React, { useEffect, useState } from 'react';
import IconBack from '../icons/IconBack';
import Input from '../components/Input';
import { useNavigate } from 'react-router';
import AddressSearchModal from '../components/Modals/AddressSearchModal';

const RegisterPage: React.FC = () => {
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
      <HeaderBar headerText="프로필 작성" />
      <div className={'pt-24 gap-[30px] flex flex-col flex-grow'}>
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
        <div className={'text-xs'}>프로필 미입력 시 앱 사용이 제한됩니다.</div>
      </div>
      {/* 버튼 */}
      <div className={'flex gap-4 py-10'}>
        <button className={'w-1/3 h-[58px] text-lg gray-button'}>
          건너뛰기
        </button>
        <button
          className={`w-2/3 h-[58px] text-lg ${isFill ? 'is-active-green-button' : 'non-active-green-button'}`}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;

interface HeaderBarProps {
  headerText: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ headerText }) => {
  const router = useNavigate();
  return (
    <div
      className={
        'grid grid-cols-[24px_1fr_24px] px-[22px] items-center h-[68px] fixed top-0 w-full left-0 bg-white'
      }
    >
      <IconBack
        width={24}
        height={24}
        onClick={() => {
          router(-1);
        }}
      />
      <div className={'text-lg font-medium text-center'}>{headerText}</div>
      <div></div>
    </div>
  );
};

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
        <div className={'flex w-full justify-between items-center'}>
          <div className={'text-base font-semibold'}>주소</div>
          <div className={'text-xs text-[#9B9B9B]'}>
            실시간 기록 기능을 위해 필요한 정보입니다.
          </div>
        </div>
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
