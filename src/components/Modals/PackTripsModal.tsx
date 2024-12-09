import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import IconModalClose from '../../icons/IconModalClose';
import { DaysOfWeek } from '../Profile/Calendar';
import IconRight from '../../icons/ProfilePage/IconRight';
import IconReset from '../../icons/ProfilePage/IconReset';
import useCalendarInfoStore from '../../stores/Profiles/CalendarInfo';
import IconLeft from '../../icons/ProfilePage/IconLeft';
import { calculateDate, formattedDate } from '../../utils/formatDate';

const PackTripsModal: React.FC = () => {
  const [tripDate, setTripDate] = useState({
    startDate: '',
    endDate: '',
  });
  const { selectedDate, setSelectedDate } = useCalendarInfoStore(
    (state) => state
  );
  const { selectedYear, selectedMonth } = selectedDate;
  const handleClickArrow = (isLeft: boolean) => {
    if (isLeft) {
      if (selectedMonth === 1) {
        setSelectedDate({ selectedYear: selectedYear - 1, selectedMonth: 12 });
      } else {
        setSelectedDate({
          selectedYear: selectedYear,
          selectedMonth: selectedMonth - 1,
        });
      }
    } else {
      // 오른쪽 화살표 클릭
      if (selectedMonth === 12) {
        setSelectedDate({ selectedYear: selectedYear + 1, selectedMonth: 1 });
      } else {
        setSelectedDate({
          selectedYear: selectedYear,
          selectedMonth: selectedMonth + 1,
        });
      }
    }
  };

  return (
    <ModalWrapper classProp="w-[330px] h-fit bg-white rounded-[20px] px-[30px] pt-5 pb-7 gap-6 text-second">
      <ModalHeader title="여행 묶기" />
      <div className={'w-full flex gap-4'}>
        <SelectDateButton text="시작" tripDate={tripDate.startDate} />
        <SelectDateButton text="끝" tripDate={tripDate.endDate} />
      </div>
      <div className={'w-full'}>
        {/*  */}
        <div className={'w-full flex gap-[14px] justify-center items-center'}>
          <IconLeft onClick={() => handleClickArrow(true)} />
          <div className={'font-semibold'}>
            {selectedYear}년 {selectedMonth}월
          </div>
          <IconRight onClick={() => handleClickArrow(false)} />
        </div>

        <DaysOfWeek className="h-11 mb-2 text-xs" />
        {/* <CalendarBody className="h-[42px]" /> */}
        <CalendarBody tripDate={tripDate} setTripDate={setTripDate} />
      </div>
      <div className={'w-full flex gap-4'}>
        <button
          onClick={() => setTripDate({ startDate: '', endDate: '' })}
          className={
            'w-[100px] h-11 flex gap-1.5 items-center justify-center gray-button flex-shrink-0'
          }
        >
          <IconReset />
          초기화
        </button>
        <button className={'w-full h-11 is-active-green-button'}>
          여행 {calculateDate(tripDate.startDate, tripDate.endDate)}일 묶기
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
}

const SelectDateButton: React.FC<SelectDateButtonProps> = ({
  text,
  tripDate,
}) => {
  return (
    <div className={'relative w-full'}>
      <div
        className={
          'w-full h-[37px] rounded-2xl border border-primary text-center text-primary text-sm font-bold grid place-items-center'
        }
      >
        {tripDate}
        <div
          className={
            'absolute -top-1.5 left-2 text-xxs bg-white rounded-full px-1'
          }
        >
          {text}
        </div>
      </div>
    </div>
  );
};

interface CalendarBodyProps {
  tripDate: {
    startDate: string;
    endDate: string;
  };
  setTripDate: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  tripDate,
  setTripDate,
}) => {
  const updateStartDate = (newStartDate: string) => {
    setTripDate((prev) => ({
      ...prev,
      startDate: newStartDate,
    }));
  };

  const updateEndDate = (newEndDate: string) => {
    setTripDate((prev) => ({
      ...prev,
      endDate: newEndDate,
    }));
  };

  const handleClickDate = (date: string) => {
    // 아무것도 선택되지 않은 상태
    if (tripDate.startDate === '') {
      updateStartDate(date);
    } else if (tripDate.endDate === '') {
      // 시작일만 선택된 상태 + 시작일보다 이전 날짜 선택
      if (new Date(date) < new Date(tripDate.startDate)) {
        updateEndDate(tripDate.startDate);
        updateStartDate(date);
      } else {
        // 시작일만 선택된 상태 + 시작일보다 이후 날짜 선택
        updateEndDate(date);
      }
      // 시작일, 종료일 모두 선택된 상태
    } else if (tripDate.startDate !== '' && tripDate.endDate !== '') {
      updateStartDate(date);
      updateEndDate('');
    }
    console.log(date);
  };

  const { selectedDate } = useCalendarInfoStore((state) => state);
  const { selectedYear, selectedMonth } = selectedDate;

  // 해당 달의 1일의 요일
  const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  // 해당 달의 마지막 날
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const renderDays = () => {
    const daysOfMonth = [];
    for (let i = 0; i < firstDay; i++) {
      daysOfMonth.push(null);
    }
    for (let i = 1; i <= lastDay; i++) {
      daysOfMonth.push(i);
    }
    return daysOfMonth.map((day, index) => {
      if (day === null) return <div key={index} />;

      const currentDate = formattedDate(selectedYear, selectedMonth, day);

      // startDate와 endDate를 계산해서 색을 칠하기 위한 범위
      const isInRange =
        tripDate.startDate &&
        tripDate.endDate &&
        new Date(currentDate) >= new Date(tripDate.startDate) &&
        new Date(currentDate) <= new Date(tripDate.endDate);

      const isStartDate = currentDate === tripDate.startDate;
      const isEndDate = currentDate === tripDate.endDate;

      return (
        <div
          onClick={() => handleClickDate(currentDate)}
          className={`w-full text-center font-medium text-xs grid place-items-center h-[42px] relative ${
            isInRange ? 'bg-[#D6F0EB]' : ''
          } ${isInRange && isStartDate ? 'rounded-l-full' : ''}
           ${isInRange && isEndDate ? 'rounded-r-full' : ''}`}
          key={index}
        >
          <span
            className={`z-20 ${isStartDate || isEndDate ? 'text-white' : ''}`}
          >
            {day}
          </span>
          {(isStartDate || isEndDate) && (
            <div
              className={
                'absolute h-full aspect-square bg-primary rounded-full z-10'
              }
            />
          )}
        </div>
      );
    });
  };

  return <div className={'w-full h-fit grid grid-cols-7'}>{renderDays()}</div>;
};
