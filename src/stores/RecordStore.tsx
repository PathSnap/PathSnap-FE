import { create } from 'zustand';

// 상태 타입 정의
interface RecordStoreState {
  isGroupRecord: boolean;
  setIsGroupRecord: (isGroupRecord: boolean) => void;
}

// Zustand store 생성
const useRecordStore = create<RecordStoreState>((set) => ({
  isGroupRecord: false,
  setIsGroupRecord: (isGroupRecord) => set({ isGroupRecord }),
}));

export default useRecordStore;
