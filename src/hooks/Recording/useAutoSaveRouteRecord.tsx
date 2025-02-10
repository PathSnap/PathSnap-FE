import { useEffect, useRef } from 'react';
import useRouteRecordStore from '../../stores/RouteRecord';

const useAutoSaveRouteRecord = () => {
  const { recordingInfo, saveRouteRecord } = useRouteRecordStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (recordingInfo.isRecording) {
      console.log('✅ 자동 저장 시작');
      intervalRef.current = setInterval(() => {
        console.log('🚀 현재 위치 저장 실행');
        saveRouteRecord();
      }, 3000);
    } else {
      console.log('⏹️ 자동 저장 중단');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recordingInfo.isRecording, saveRouteRecord]);

  return null;
};

export default useAutoSaveRouteRecord;
