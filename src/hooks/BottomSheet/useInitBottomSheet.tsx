import { useEffect } from 'react';
import useRecordStore from '../../stores/RecordStore';
import useFriendStore from '../../stores/FriendStore';

const useInitBottomSheet = () => {
  const { searchRecord, recordId } = useRecordStore();
  const { searchFriendsAtRecord } = useFriendStore();

  useEffect(() => {
    searchRecord();
    searchFriendsAtRecord(recordId);
  }, [recordId]);
};

export default useInitBottomSheet;
