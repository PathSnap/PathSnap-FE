import { create } from 'zustand';
import { api } from '../utils/api';

// 기록 조회 시 나오는 정보
type record = {
  recordId: string;
  recordName: string;
  photoRecords?: photoRecord[];
  routeRecords?: routeRecord[];
  group: boolean;
};
// photoRecord
type photoRecord = {
  photoId: string;
  seq: number;
  images: image[];
  photoTitle: string;
  photoContent: string;
  photoDate: string;
  lat: number;
  lng: number;
};

type image = {
  imageId: string;
  url: string;
};
// routeRecord
type routeRecord = {
  routeId: string;
  seq: number;
  transportMode: string | null;
  startDate: string;
  endDate: string;
  coordinates: coordinate[];
};

type coordinate = {
  lat: number;
  lng: number;
  timeStamp: string;
};

// 상태 타입 정의
interface RecordStoreState {
  recordId: string;
  record: record;
  setRecord(record: record): void;
  setRecordId: (recordId: string) => void;
  searchRecord: () => void;
  recordDate: string;
  setRecordDate: (recordDate?: string) => void;
}

// Zustand store 생성
const useRecordStore = create<RecordStoreState>((set, get) => ({
  recordId: 'aa0119ab-4301-4dfa-9fd3-0541e40ea25a',
  record: {
    recordId: '',
    recordName: '',
    photoRecords: [],
    routeRecords: [],
    group: true,
  },
  setRecord: (record: record) => set({ record }),
  setRecordId: (recordId: string) => set({ recordId }),

  searchRecord: async () => {
    const recordId = get().recordId;
    try {
      const res: record = await api.get(`/records/detail/${recordId}`);
      set({ record: res });
      get().setRecordDate();
    } catch (error) {
      console.error('Error fetching record:', error);
    }
  },
  recordDate: '',
  setRecordDate: (recordDate?: string) => {
    const { record } = get();
    const photoRecords: any = record.photoRecords;
    const routeRecords: any = record.routeRecords;

    let date = '';

    if (recordDate) {
      date = recordDate;
    } else if (photoRecords && photoRecords.length > 0) {
      date = photoRecords[0].photoDate.slice(0, 10);
    } else if (routeRecords && routeRecords.length > 0) {
      date = routeRecords[0].startDate.slice(0, 10);
    }
    console.log('recordDate :', date);

    set({ recordDate: date });
  },
}));

export default useRecordStore;
