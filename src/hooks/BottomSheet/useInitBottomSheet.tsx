import { useEffect } from 'react';
import useRecordStore from '../../stores/RecordStore';
import useFriendStore from '../../stores/FriendStore';

const useInitBottomSheet = () => {
  const recordId = localStorage.getItem('recordId');
  const { searchRecord } = useRecordStore();
  const { searchFriendsAtRecord } = useFriendStore();

  useEffect(() => {
    if (recordId) {
      searchRecord(recordId);
      searchFriendsAtRecord(recordId);
    }
  }, [recordId]);
};

export default useInitBottomSheet;
