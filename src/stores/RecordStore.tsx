import { create } from 'zustand';
import { api } from '../utils/api';

// 기록 조회 시 나오는 정보
type Record = {
  recordId: string;
  recordName: string;
  photoRecords?: photoRecord[];
  routeRecords?: routeRecord[];
  group: boolean;
};
// photoRecord
export type photoRecord = {
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
export type routeRecord = {
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
  // recordId: string;
  record: Record;
  setRecord(record: Record): void;
  // setRecordId: (recordId: string) => void;
  searchRecord: (recordId: string) => void;
  recordDate: string;
  setRecordDate: (recordDate?: string) => void;
  editRecord: (recordId: string, recordName: string) => void;
  copyRecord: Record;
  setCopyRecord: (record: Record) => void;
  deleteCopyRecord: (photoId: string) => void;
  deletePhotoRecord: (photoId: string) => void;
  // deleteRecord: (reocrdId: string) => void;
  seq: number;
  setSeq: (seq: number) => void;
  // startRecord: (recordIsGroup: boolean) => void;
  // isRecording: boolean;
  // setIsRecording: (isRecording: boolean) => void;
}

const useRecordStore = create<RecordStoreState>((set, get) => ({
  // recordId: '',
  record: {
    recordId: '',
    recordName: '',
    photoRecords: [],
    routeRecords: [],
    group: true,
  },
  seq: 0,
  setSeq: (seq: number) => set({ seq }),
  setRecord: (record: Record) => {
    set({ record });
  },
  // setRecordId: (recordId: string) => {
  //   set({ recordId });
  //   localStorage.setItem('recordId', recordId);
  // },
  searchRecord: async (recordId: string) => {
    try {
      const res: Record = await api.get(`/records/detail/${recordId}`);
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

    set({ recordDate: date });
  },
  editRecord: async (recordId: string, recordName: string) => {
    try {
      const res = await api.post('/records/edit', {
        recordId,
        recordName,
      });
      console.log(res);
    } catch (error) {
      console.error('Error editing record:', error);
    }
  },
  copyRecord: {
    recordId: '',
    recordName: '',
    photoRecords: [],
    routeRecords: [],
    group: true,
  },
  setCopyRecord: (record: Record) => set({ copyRecord: record }),
  deleteCopyRecord: (photoId: string) => {
    const photoRecords = get().copyRecord.photoRecords || [];
    const filteredRecords = photoRecords.filter(
      (photoRecord) => photoRecord.photoId !== photoId
    );
    set((state) => ({
      copyRecord: {
        ...state.copyRecord,
        photoRecords: filteredRecords,
      },
    }));
  },
  deletePhotoRecord: async (photoId: string) => {
    try {
      const res = await api.delete(`/photos/delete/${photoId}`);
      console.log(res);
    } catch (error) {
      console.error('Error deleting photoRecord:', error);
    }
  },
  // deleteRecord: async (recordId: string) => {
  //   try {
  //     const res = await api.delete(`/records/delete/${recordId}`);
  //     console.log(res);
  //   } catch (error) {
  //     console.error('Error deleting record:', error);
  //   }
  // },
  // startRecord: async (recordIsGroup: boolean) => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     const res: any = await api.get(
  //       `/records/start/${userId}/${recordIsGroup}`
  //     );
  //     get().setRecordId(res.recordId);
  //     console.log(res);
  //   } catch (error) {
  //     console.error('Error starting record:', error);
  //   }
  // },
  // isRecording: false,
  // setIsRecording: (isRecording: boolean) => set({ isRecording }),
}));

export default useRecordStore;
