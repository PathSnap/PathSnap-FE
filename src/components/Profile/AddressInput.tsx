import { useState } from 'react';
import AddressSearchModal from '../Modals/AddressSearchModal';
import useOverflowInput from '../../hooks/useOverflowInput';

interface AddressInputProps {
  value: string;
  setValue: (value: string) => void;
  isRegisterPage?: boolean;
  error: boolean;
  isSubmit: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  setValue,
  isRegisterPage = false,
  error = false,
  isSubmit = false,
}) => {
  const [modalState, setModalState] = useState(false);
  const openAddressSearch = () => {
    setModalState(true);
  };
  const closeAddressSearch = () => {
    setModalState(false);
  };
  const onCompletePost = (data: any) => {
    setValue(data.address);
    setModalState(false);
  };
  const { inputRef, isOverflowing } = useOverflowInput(value);
  return (
    <>
      <div className={'flex flex-col gap-1.5 w-full relative'}>
        <div className={'flex w-full justify-between items-center'}>
          <div className={'text-base font-semibold'}>주소</div>
          {isRegisterPage && (
            <div className={'text-xs text-[#9B9B9B]'}>
              실시간 기록 기능을 위해 필요한 정보입니다.
            </div>
          )}
        </div>
        <div
          style={{
            ...{
              flexDirection: isOverflowing ? 'column' : 'row',
            },
            ...(isOverflowing && { padding: '12px 0px' }),
            ...(isSubmit &&
              error && {
                outlineColor: '#FFB4B4',
                outlineWidth: '1px',
                outlineStyle: 'solid',
                boxShadow: '0px 0px 8px rgba(255, 180, 180, 0.5)',
              }),
          }}
          className={
            'relative w-full min-h-[54px] h-fit bg-[#F5F5F5] rounded-xl flex items-center gap-2.5'
          }
        >
          <input
            ref={inputRef}
            value={value}
            placeholder="기본주소"
            disabled={true}
            className={
              'w-full h-full bg-inherit rounded-xl focus:outline-none px-3'
            }
          />
          <button
            type="button"
            onClick={openAddressSearch}
            style={isOverflowing ? { alignSelf: 'end' } : {}}
            className={
              'w-[88px] h-11 rounded-xl border border-primary text-primary font-semibold shrink-0 mr-3'
            }
          >
            주소 검색
          </button>
          {isSubmit && error && (
            <div
              className={
                'absolute top-full pt-0.5 text-error font-semibold text-sm'
              }
            >
              필수 입력 항목입니다.
            </div>
          )}
        </div>
        {isRegisterPage && (
          <div className={'text-xs pt-[18px]'}>
            프로필 미입력 시 앱 사용이 제한됩니다.
          </div>
        )}
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

export default AddressInput;
