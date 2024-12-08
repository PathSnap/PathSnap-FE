import useRecordStore from '../../stores/RecordStore';
import useFriendStore from '../../stores/FriendStore';
import useRouteRecordStore from '../../stores/RouteRecord';
import { useEffect } from 'react';

export const InitBottomSheet = () => {
  const recordingInfo = useRouteRecordStore((state) => state.recordingInfo);

  const { searchRecord } = useRecordStore();
  const { searchFriendsAtRecord } = useFriendStore();

  const getRecordInfo = async () => {
    if (recordingInfo.recordId) {
      const res = await searchRecord(recordingInfo.recordId);
      if (res?.group) searchFriendsAtRecord(recordingInfo.recordId);
    }
  };

  getRecordInfo();
};

export const useInitBottomSheet = () => {
  const recordingInfo = useRouteRecordStore((state) => state.recordingInfo);

  const { searchRecord } = useRecordStore();
  const { searchFriendsAtRecord } = useFriendStore();

  const getRecordInfo = async () => {
    if (recordingInfo.recordId) {
      const res = await searchRecord(recordingInfo.recordId);
      if (res?.group) searchFriendsAtRecord(recordingInfo.recordId);
    }
  };

  useEffect(() => {
    getRecordInfo();
  }, []);
};
