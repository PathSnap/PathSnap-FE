import React, { ReactNode } from 'react';
import useEditRecordStore from '../../../stores/EditRecordStore';
import IconDrag from '../../../icons/BottomSheeet/IconDrag';
import IconEdit from '../../../icons/BottomSheeet/IconEdit';
import IconTrash from '../../../icons/BottomSheeet/IconTrash';

interface RecordWrapperProps {
  children: ReactNode;
  className?: string;
  isPhotoRecord?: boolean;
}
const RecordWrapper: React.FC<RecordWrapperProps> = ({
  children,
  className,
  isPhotoRecord,
}) => {
  const { currentState } = useEditRecordStore();

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
                <div
                  className={
                    'w-[60px] aspect-square rounded-full border border-white grid place-items-center'
                  }
                >
                  <IconEdit stroke="#FFFFFF" />
                </div>
              </>
            )}
            <div
              className={
                'w-[60px] aspect-square rounded-full border border-white grid place-items-center'
              }
            >
              <IconTrash stroke="#FFFFFF" />
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default RecordWrapper;
