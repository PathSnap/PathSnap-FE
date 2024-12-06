import { create } from 'zustand';

interface ModalStoreState {
  isModalOpen: boolean;
  modalType: string;
  setModalType: (type: string) => void;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStoreState>((set) => ({
  isModalOpen: false,
  modalType: '',
  setModalType: (type) => {
    set({ modalType: type });
  },
  openModal: (type) => {
    set({ isModalOpen: true });
    set({ modalType: type });
  },
  closeModal: () => {
    set({ isModalOpen: false });
  },
}));

export default useModalStore;
