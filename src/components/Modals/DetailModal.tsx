import IconCancel from '../../icons/IconCancel';
import RecordInfo from '../../icons/IconRecordInfo';
import useFriendStore from '../../stores/FriendStore';
import useDetailModalTypeStore from '../../stores/Modals/DetailModalType';
import useModalStore from '../../stores/Modals/ModalStore';
import useSelectedPhotoStore from '../../stores/Modals/SelectedPhotoStore';
import useRecordStore from '../../stores/RecordStore';
import useRouteRecordStore from '../../stores/RouteRecord';
import ModalWrapper from './ModalWrapper';

const DetailModal = () => {
  const { closeModal } = useModalStore();
  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-7 py-[30px] gap-2 text-second text-center">
      <IconCancel
        onClick={closeModal}
        className="absolute bottom-full -translate-y-5 right-0"
      />
      <Title />
      <Content />
      <Buttons />
    </ModalWrapper>
  );
};

export default DetailModal;

const Title = () => {
  const { detailModalType } = useDetailModalTypeStore((state) => state);
  return (
    <div className="w-full text-lg font-semibold ">
      {detailModalType === 'recordType'
        ? '어떤 여행을 하실 건가요?'
        : '삭제 하시겠습니까?'}
    </div>
  );
};

const Content = () => {
  const { detailModalType } = useDetailModalTypeStore((state) => state);
  return (
    <div className="w-full text-xs">
      {detailModalType === 'recordType' ? (
        <>
          혼자 간다면 개인 여행을,
          <br />
          누군가와 함께 간다면 단체 여행을 선택해주세요.
        </>
      ) : (
        '삭제하시면 다시 복구시킬 수 없습니다.'
      )}
    </div>
  );
};

const Buttons = () => {
  const { detailModalType } = useDetailModalTypeStore((state) => state);
  const { closeModal } = useModalStore();
  const { deleteSearchRecord, deleteCopyRecord, searchRecord, seq, setSeq } =
    useRecordStore((state) => state);
  const { selectedRecord } = useSelectedPhotoStore((state) => state);
  const { recordingInfo, startRecord, saveStartRouteRecord, deleteRecord } =
    useRouteRecordStore();
  const { searchFriendsAtRecord } = useFriendStore();

  const getRecordInfo = async (recordId: string) => {
    if (recordId) {
      const res = await searchRecord(recordId);
      if (res?.group) searchFriendsAtRecord(recordId);
    }
  };

  const handleClickDelete = () => {
    if (detailModalType === 'deletePhotoRecord') {
      deleteCopyRecord(selectedRecord.photoId);
    }
    if (detailModalType === 'deleteRecord') {
      if (recordingInfo.isRenderingRecording) {
        // 녹화 중인 루트 삭제 (화면 내려줘야됨됨)
        deleteRecord();
      } else if (recordingInfo.isSerching) {
        // 검색 중인 루트 삭제 (포토 초기화해줘야됨됨)
        deleteSearchRecord();
        window.location.reload();
      }
    }

    closeModal();
  };

  const handleClickRecordType = async (recordIsGroup: boolean) => {
    try {
      setSeq(seq);
      const recordId = await startRecord(recordIsGroup);

      if (recordId) {
        await saveStartRouteRecord(recordId, seq);
        setSeq(seq + 1);
        await getRecordInfo(recordId);
        console.log('Route record saved successfully!');
      } else {
        console.error('Failed to retrieve recordId.');
      }
      closeModal();
    } catch (error) {
      console.error('Error in handleClickRecordType:', error);
    }
  };
  return (
    <div className={'w-full flex justify-between gap-4 pt-[22px]'}>
      {detailModalType === 'recordType' ? (
        <>
          <button
            onClick={() => {
              handleClickRecordType(false);
            }}
            className={
              'w-full h-11 rounded-2xl border border-primary bg-white text-primary font-semibold'
            }
          >
            개인 여행
          </button>
          {/* <button
            onClick={() => {
              handleClickRecordType(true);
            }}
            className={
              'w-full h-11 rounded-2xl border border-primary bg-white text-primary font-semibold'
            }
          >
            단체 여행
          </button> */}
        </>
      ) : (
        <>
          <button onClick={closeModal} className={'w-full h-11 gray-button'}>
            취소
          </button>
          <button
            onClick={() => {
              handleClickDelete();
            }}
            className={'w-full h-11 is-active-green-button'}
          >
            삭제
          </button>
        </>
      )}
    </div>
  );
};
