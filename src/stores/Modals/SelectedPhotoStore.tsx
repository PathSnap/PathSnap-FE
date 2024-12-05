import { create } from 'zustand';
import { photoRecord, routeRecord } from '../RecordStore';

interface SelectedPhotoStoreState {
  selectedRecord: photoRecord | routeRecord | null; // 초기값을 null로 설정
  setSelectedRecord: (record: photoRecord | routeRecord) => void;
}

const useSelectedPhotoStore = create<SelectedPhotoStoreState>((set) => ({
  selectedRecord: null, // 초기값을 null로 설정
  setSelectedRecord: (record: photoRecord | routeRecord) => {
    set({ selectedRecord: record });
  },
}));

export default useSelectedPhotoStore;
