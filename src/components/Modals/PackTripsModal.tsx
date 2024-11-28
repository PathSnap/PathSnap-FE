import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import IconModalClose from '../../icons/IconModalClose';
import { CalendarBody, DaysOfWeek } from '../Profile/Calendar';
import IconRight from '../../icons/ProfilePage/IconRight';
import IconReset from '../../icons/ProfilePage/IconReset';

const PackTripsModal: React.FC = () => {
  const [tripDate, setTripDate] = useState({
    startDate: '',
    endDate: '',
  });
  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-[30px] pt-5 pb-7 gap-6 text-second">
      <ModalHeader title="여행 묶기" />
      <div className={'w-full flex gap-4'}>
        <SelectDateButton
          text="시작"
          tripDate={tripDate.startDate}
          setTripDate={(value) =>
            setTripDate({ ...tripDate, startDate: value })
          }
        />
        <SelectDateButton
          text="끝"
          tripDate={tripDate.endDate}
          setTripDate={(value) => setTripDate({ ...tripDate, endDate: value })}
        />
      </div>
      <div className={'w-full'}>
        <div className={'flex gap-1 px-4 font-semibold'}>
          2024년 5월 <IconRight />
        </div>
        <DaysOfWeek className="h-11 mb-2" />
        <CalendarBody
          dateInfo={{ year: 2024, month: 11 }}
          className="h-[42px]"
        />
      </div>
      <div className={'w-full flex gap-4'}>
        <button
          className={
            'w-[100px] h-11 flex gap-1.5 items-center justify-center gray-button flex-shrink-0'
          }
        >
          <IconReset /> 초기화
        </button>
        <button className={'w-full h-11 is-active-green-button'}>
          여행 5일 묶기
        </button>
      </div>
    </ModalWrapper>
  );
};

export default PackTripsModal;

interface ModalHeaderProps {
  title: string;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({ title }) => {
  return (
    <div
      className={'w-full grid grid-cols-[24px_auto_24px] place-items-center'}
    >
      <div></div>
      <div className={'font-semibold text-center'}>{title}</div>
      <IconModalClose />
    </div>
  );
};

interface SelectDateButtonProps {
  text: string;
  tripDate: string;
  setTripDate: (value: string) => void;
}

const SelectDateButton: React.FC<SelectDateButtonProps> = ({
  text,
  tripDate,
  setTripDate,
}) => {
  return (
    <div className={'relative w-full'}>
      <input
        value={tripDate}
        onChange={(e) => setTripDate(e.target.value)}
        type="date"
        className={
          'w-full h-[37px] rounded-2xl border border-primary text-center text-primary text-sm font-bold'
        }
      />
      <div
        className={
          'absolute -top-1.5 left-2 text-xxs bg-white rounded-full px-1'
        }
      >
        {text}
      </div>
    </div>
  );
};
