import React from 'react';
import ModalBackground from '../components/Modals/ModalBackground';
import AddPhotoModal from '../components/BottomSheet/AddPhotoModal';
import useModalStore from '../stores/ModalStore';

const ModalView: React.FC = () => {
  const { modalType, isModalOpen } = useModalStore();
  return (
    <>
      {isModalOpen && (
        <ModalBackground>
          {modalType === 'addPhotoModal' && <AddPhotoModal />}
        </ModalBackground>
      )}
    </>
  );
};

export default ModalView;
