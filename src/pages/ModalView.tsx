import React from 'react';
import ModalBackground from '../components/Modals/ModalBackground';
import AddPhotoModal from '../components/Modals/AddPhotoModal';
import useModalStore from '../stores/ModalStore';
import PhotoDetailModal from '../components/Modals/PhotoDetailModal';

const ModalView: React.FC = () => {
  const { modalType, isModalOpen } = useModalStore();
  return (
    <>
      {isModalOpen && (
        <ModalBackground>
          {modalType === 'addPhotoModal' && <AddPhotoModal />}
          {modalType === 'photoDetailModal' && <PhotoDetailModal />}
        </ModalBackground>
      )}
    </>
  );
};

export default ModalView;
