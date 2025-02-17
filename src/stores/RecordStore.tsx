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
  isSelect: boolean;
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

export type coordinate = {
  lat: number;
  lng: number;
  timeStamp: string;
};

// 상태 타입 정의
interface RecordStoreState {
  record: Record;
  setRecord(record: Record): void;
  searchRecord: (recordId: string) => Promise<Record | undefined>;
  recordDate: string;
  setRecordDate: (recordDate?: string) => void;
  editRecord: (recordId: string, recordName: string) => void;
  copyRecord: Record;
  setCopyRecord: (record: Record) => void;
  deleteCopyRecord: (photoId: string) => void;
  deletePhotoRecord: (photoId: string) => void;
  seq: number;
  setSeq: (seq: number) => void;
  changeALLPhotoRecordIsSelectfalse: () => void;
  changePhotoRecordIsSelect: (photoId: string) => Record;
  deleteSearchRecord: () => void;
}

const useRecordStore = create<RecordStoreState>((set, get) => ({
  record: {
    recordId: '',
    recordName: '',
    photoRecords: [],
    routeRecords: [],
    group: false,
  },
  seq: 0,
  setSeq: (seq: number) => set({ seq }),
  setRecord: (record: Record) => {
    set({ record });
  },
  searchRecord: async (recordId: string) => {
    try {
      const res: Record = await api.get(`/records/detail/${recordId}`);

      // photoRecords에 isSelect 추가
      const updatedPhotoRecords = res.photoRecords?.map((photoRecord) => ({
        ...photoRecord,
        isSelect: false, // 기본값 추가
      }));

      // 가공된 데이터를 상태에 저장
      const updatedRecord: Record = {
        ...res,
        photoRecords: updatedPhotoRecords,
      };

      get().setRecord(updatedRecord);
      get().setRecordDate();

      const recordNum =
        (res.photoRecords?.length ?? 0) + (res.routeRecords?.length ?? 1);
      set({ seq: recordNum });
      return updatedRecord;
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
    } else {
      date = new Date().toISOString().slice(0, 10);
    }
    // console.log(date);

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
  changeALLPhotoRecordIsSelectfalse: () => {
    const photoRecords = get().record.photoRecords || [];
    const filteredRecords = photoRecords.map((photoRecord) => {
      return { ...photoRecord, isSelect: false };
    });
    get().setRecord({ ...get().record, photoRecords: filteredRecords });
  },
  changePhotoRecordIsSelect: (photoId?: string): Record => {
    const photoRecords = get().record.photoRecords || [];
    const updatedRecords = photoRecords.map((photoRecord) => ({
      ...photoRecord,
      isSelect: photoRecord.photoId === photoId, // 선택한 것만 true, 나머지는 false
    }));
    const newRecord: Record = { ...get().record, photoRecords: updatedRecords };
    get().setRecord(newRecord);
    return newRecord;
  },
  deleteSearchRecord: async () => {
    try {
      const res = await api.delete(`/records/delete/${get().record.recordId}`);

      console.log(res);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  },
}));

export default useRecordStore;
