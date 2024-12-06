import { create } from 'zustand';
import { photoRecord } from '../RecordStore';

interface SelectedPhotoStoreState {
  selectedRecord: photoRecord;
  setSelectedRecord: (record: photoRecord) => void;
}

const useSelectedPhotoStore = create<SelectedPhotoStoreState>((set) => ({
  selectedRecord: {
    photoId: '',
    seq: 0,
    images: [],
    photoTitle: '',
    photoContent: '',
    photoDate: '',
    lat: 0,
    lng: 0,
  },
  setSelectedRecord: (record: photoRecord) => {
    set({ selectedRecord: record });
  },
}));

export default useSelectedPhotoStore;
