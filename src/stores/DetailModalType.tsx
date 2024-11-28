import { create } from 'zustand';

interface DetailModalTypeProps {
  detailModalType: string;
  setDetailModalType: (type: string) => void;
}

const useDetailModalTypeStore = create<DetailModalTypeProps>((set) => ({
  detailModalType: '',
  setDetailModalType: (type: string) => {
    set({ detailModalType: type });
  },
}));

export default useDetailModalTypeStore;
