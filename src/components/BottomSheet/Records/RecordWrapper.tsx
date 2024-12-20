import React, { ReactNode } from 'react';
import useEditRecordStore from '../../../stores/EditRecordStore';
import IconDrag from '../../../icons/BottomSheeet/IconDrag';
import IconEdit from '../../../icons/BottomSheeet/IconEdit';
import IconTrash from '../../../icons/BottomSheeet/IconTrash';
import useDetailModalTypeStore from '../../../stores/Modals/DetailModalType';
import useModalStore from '../../../stores/Modals/ModalStore';
import { photoRecord } from '../../../stores/RecordStore';
import useSelectedPhotoStore from '../../../stores/Modals/SelectedPhotoStore';

interface RecordWrapperProps {
  children: ReactNode;
  className?: string;
  isPhotoRecord?: boolean;
  record?: photoRecord;
}
const RecordWrapper: React.FC<RecordWrapperProps> = ({
  children,
  className,
  isPhotoRecord = false,
  record,
}) => {
  const { currentState } = useEditRecordStore();

  const { setDetailModalType } = useDetailModalTypeStore();
  const { openModal } = useModalStore();
  const { setSelectedRecord } = useSelectedPhotoStore();
  const handleClickDelete = () => {
    if (!isPhotoRecord || !record) return;
    setSelectedRecord(record);
    setDetailModalType('deletePhotoRecord');
    openModal('detailModal');
  };

  const IconWrapperStyle =
    'w-[60px] aspect-square rounded-full border border-white grid place-items-center';

  return (
    <div
      className={`w-full h-[170px] rounded-2xl relative flex-shrink-0 ${className}`}
    >
      {currentState === 'EDIT' && (
        <div
          className={
            'bg-black bg-opacity-60 h-full absolute w-full z-30 rounded-2xl inset-0'
          }
        >
          <IconDrag className="absolute top-4 right-4" />
          <div className={'flex gap-10 justify-center items-center h-full'}>
            {isPhotoRecord && (
              <>
                <div className={IconWrapperStyle}>
                  <IconEdit stroke="#FFFFFF" />
                </div>
                <div className={IconWrapperStyle}>
                  <IconTrash onClick={handleClickDelete} stroke="#FFFFFF" />
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default RecordWrapper;
