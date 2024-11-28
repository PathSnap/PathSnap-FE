import useDetailModalTypeStore from '../../stores/DetailModalType';
import useModalStore from '../../stores/ModalStore';
import ModalWrapper from './ModalWrapper';

const DetailModal = () => {
  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-7 py-[30px] gap-2 text-second text-center">
      <Title />
      <Content />
      <Buttons />
    </ModalWrapper>
  );
};

export default DetailModal;

const Title = () => {
  const { detailModalType } = useDetailModalTypeStore();
  return (
    <div className="w-full text-lg font-semibold ">
      {detailModalType === 'recordType'
        ? '어떤 여행을 하실 건가요?'
        : '삭제 하시겠습니까?'}
    </div>
  );
};

const Content = () => {
  const { detailModalType } = useDetailModalTypeStore();
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
  const { detailModalType } = useDetailModalTypeStore();
  const { closeModal } = useModalStore();
  return (
    <div className={'w-full flex justify-between gap-4 pt-[22px]'}>
      {detailModalType === 'recordType' ? (
        <>
          <button
            className={
              'w-full h-11 rounded-2xl border border-primary bg-white text-primary font-semibold'
            }
          >
            개인 여행
          </button>
          <button
            className={
              'w-full h-11 rounded-2xl border border-primary bg-white text-primary font-semibold'
            }
          >
            단체 여행
          </button>
        </>
      ) : (
        <>
          <button onClick={closeModal} className={'w-full h-11 gray-button'}>
            취소
          </button>
          <button className={'w-full h-11 is-active-green-button'}>삭제</button>
        </>
      )}
    </div>
  );
};