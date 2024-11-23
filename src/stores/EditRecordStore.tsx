import { create } from 'zustand';

// 아무 것도 할 수 없는 상태/수정/삭제
type EditState = 'NONE' | 'EDIT' | 'DELETE';

interface EditRecordStore {
  currentState: EditState;
  setState: (state: EditState) => void;
  resetState: () => void;
}

const useEditRecordStore = create<EditRecordStore>((set) => ({
  currentState: 'NONE',
  setState: (state: EditState) => set({ currentState: state }),
  resetState: () => set({ currentState: 'NONE' }),
}));

export default useEditRecordStore;
