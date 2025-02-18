import { create } from 'zustand';
import { api } from '../utils/api';
import { formattedRealTime } from '../utils/formatDate';

type RecordingInfo = {
  isSerching: boolean;
  isRecording: boolean;
  isRenderingRecording: boolean;
  recordId: string;
  routeId: string;
};

const defaultRecordingInfo: RecordingInfo = {
  isSerching: false,
  isRecording: false,
  isRenderingRecording: false,
  recordId: '',
  routeId: '',
};

interface RouteRecordState {
  // 경로 기록 시작
  startRecord: (recordIsGroup: boolean) => Promise<string>;
  saveStartRouteRecord: (recordId: string, seq: number) => Promise<string>;
  // 경로 기록 종료
  saveRouteRecord: () => void;
  // 기록 전체 삭제
  deleteRecord: () => void;
  // 기록에 대한 정보 초기화
  initRecord: () => void;
  EndsaveRouteRecord: () => void;
  recordingInfo: RecordingInfo;
  setRecordingInfo: (recordingInfo: RecordingInfo) => void;
}
const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error('Failed to retrieve location: ' + error.message));
      }
    );
  });
};

const useRouteRecordStore = create<RouteRecordState>((set, get) => ({
  recordingInfo: (() => {
    const storedInfo = localStorage.getItem('recordingInfo');
    return storedInfo ? JSON.parse(storedInfo) : defaultRecordingInfo;
  })(),
  setRecordingInfo: (recordingInfo: RecordingInfo) => {
    set({ recordingInfo });
    localStorage.setItem('recordingInfo', JSON.stringify(recordingInfo));
  },
  startRecord: async (recordIsGroup: boolean) => {
    try {
      const userId = localStorage.getItem('userId');
      const res: any = await api.get(
        `/records/start/${userId}/${recordIsGroup}`
      );
      return res.recordId;
    } catch (error) {
      console.error('Error starting record:', error);
    }
  },
  saveStartRouteRecord: async (recordId: string, seq: number) => {
    try {
      const res: any = await api.get(`/routes/start/${recordId}/${seq}`);
      get().setRecordingInfo({
        isSerching: false,
        recordId,
        isRecording: true,
        isRenderingRecording: true,
        routeId: res.routeId,
      });
      return res.routeId;
    } catch (error) {
      console.error('Error saving start route record:', error);
    }
  },
  saveRouteRecord: async () => {
    try {
      const currentLocation = await getCurrentLocation(); // ✅ 현재 위치 가져오기

      const res = await api.post('routes/save', {
        routeId: get().recordingInfo.routeId,
        coordinateReqDto: {
          lat: currentLocation.lat, // ✅ 현재 위도 저장
          lng: currentLocation.lng, // ✅ 현재 경도 저장
          timeStamp: formattedRealTime(),
        },
      });

      console.log(res);
    } catch (error) {
      console.error('❌ Error saving route record:', error);
    }
  },
  EndsaveRouteRecord: async () => {
    try {
      const currentLocation = await getCurrentLocation(); // ✅ 현재 위치 가져오기

      const res = await api.post('routes/save', {
        routeId: get().recordingInfo.routeId,
        coordinateReqDto: {
          lat: currentLocation.lat, // ✅ 현재 위도 저장
          lng: currentLocation.lng, // ✅ 현재 경도 저장
          timeStamp: formattedRealTime(),
        },
      });

      console.log(res);
      get().initRecord();
    } catch (error) {
      console.error('❌ Error saving route record:', error);
    }
  },
  deleteRecord: async () => {
    try {
      const res = await api.delete(
        `/records/delete/${get().recordingInfo.recordId}`
      );
      get().initRecord();
      console.log(res);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  },
  initRecord: () => {
    localStorage.removeItem('recordingInfo');
    set({ recordingInfo: defaultRecordingInfo });
  },
}));

export default useRouteRecordStore;
