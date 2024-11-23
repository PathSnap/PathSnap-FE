import { create } from 'zustand';

// 상태 타입 정의
interface RecordStoreState {
  isGroupRecord: boolean;
}

// Zustand store 생성
const useRecordStore = create<RecordStoreState>(() => ({
  isGroupRecord: true,
}));

export default useRecordStore;
