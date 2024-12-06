import { create } from 'zustand';

// recordType -> 단체/개인 선택
// deletePhotoRecord -> 사진 기록 삭제
// deleteRecord -> 기록 삭제

type DetailModalType =
  | 'recordType'
  | 'deletePhotoRecord'
  | 'deleteRecord'
  | null;
interface DetailModalTypeProps {
  detailModalType: DetailModalType;
  setDetailModalType: (type: DetailModalType) => void;
}

const useDetailModalTypeStore = create<DetailModalTypeProps>((set) => ({
  detailModalType: null,
  setDetailModalType: (type: DetailModalType) => {
    set({ detailModalType: type });
  },
}));

export default useDetailModalTypeStore;
