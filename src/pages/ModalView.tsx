import React from 'react';
import ModalBackground from '../components/Modals/ModalBackground';
import AddPhotoModal from '../components/Modals/AddPhotoModal';
import useModalStore from '../stores/ModalStore';
import PhotoDetailModal from '../components/Modals/PhotoDetailModal';
import PackTripsModal from '../components/Modals/PackTripsModal';

const ModalView: React.FC = () => {
  const { modalType, isModalOpen } = useModalStore();
  return (
    <>
      {isModalOpen && (
        <ModalBackground>
          {modalType === 'addPhotoModal' && <AddPhotoModal />}
          {modalType === 'photoDetailModal' && <PhotoDetailModal />}
          {modalType === 'packTripsModal' && <PackTripsModal />}
        </ModalBackground>
      )}
    </>
  );
};

export default ModalView;
