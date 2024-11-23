import React from 'react';
import DaumPostCode from 'react-daum-postcode';
import IconCancel from '../../icons/IconCancel';

interface AddressSearchModalProps {
  onCompletePost: (data: any) => void;
  closeAddressSearch: () => void;
}

const AddressSearchModal: React.FC<AddressSearchModalProps> = ({
  onCompletePost,
  closeAddressSearch,
}) => {
  return (
    <div
      className={
        'max-w-[500px] min-w-[375px] w-full fixed inset-0 mx-auto bg-black/60 z-50 overflow-hidden grid place-items-center'
      }
    >
      <IconCancel
        className="absolute right-[5%] top-5"
        onClick={closeAddressSearch}
      />
      <DaumPostCode
        style={{ width: '90%', height: '70%' }}
        onComplete={onCompletePost}
      />
    </div>
  );
};

export default AddressSearchModal;
