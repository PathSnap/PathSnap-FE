import React, { useEffect, useState } from 'react';
import { BoxWrapper } from '../../pages/ProfilePage';
import IconLeft from '../../icons/ProfilePage/IconLeft';
import IconRight from '../../icons/ProfilePage/IconRight';
import useModalStore from '../../stores/Modals/ModalStore';
import useCalendarInfoStore from '../../stores/Profiles/CalendarInfo';

const Calendar: React.FC = () => {
  const { searchMonthTrip, selectedDate } = useCalendarInfoStore(
    (state) => state
  );

  useEffect(() => {
    searchMonthTrip(selectedDate);
  }, [selectedDate]);

  return (
    <div className={'flex flex-col gap-[14px]'}>
      <div className={'font-semibold'}>캘린더</div>
      <BoxWrapper className="flex flex-col px-4 py-6 items-center gap-5 relative">
        <CalendarHeader />
        <DaysOfWeek />
        <CalendarBody />
      </BoxWrapper>
      <CombineDaysBtn />
    </div>
  );
};

export default Calendar;

const CalendarHeader: React.FC = () => {
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

  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState<boolean>(false);
  const handleClickMonthPicker = () => {
    setIsMonthPickerOpen((prev) => !prev);
  };

  return (
    <div className={'w-full flex gap-[14px] justify-center items-center'}>
      <IconLeft onClick={() => handleClickArrow(true)} />
      <div
        onClick={handleClickMonthPicker}
        className={`text-xxl font-semibold ${isMonthPickerOpen && 'text-[#77CEBD]'}`}
      >
        {selectedYear}년 {selectedMonth}월
      </div>
      <IconRight onClick={() => handleClickArrow(false)} />
      {isMonthPickerOpen && (
        <div className="w-full h-[calc(100%-56px)] overflow-y-auto absolute top-14 bg-white z-10 rounded-2xl">
          {'이후 추가 예정>_<'}
        </div>
      )}
    </div>
  );
};

interface DaysOfWeekProps {
  className?: string;
}
export const DaysOfWeek: React.FC<DaysOfWeekProps> = ({ className = '' }) => {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div
      className={`w-full h-14 grid grid-cols-7 place-items-center relative ${className}`}
    >
      <div
        className={
          'absolute w-[calc(100%-32px)] h-[1.5px] bg-second-light/15 top-full'
        }
      ></div>
      {DAYS.map((day, index) => (
        <div
          key={index}
          className={`w-full text-center text-second-light font-medium ${index === 0 ? 'text-[#FF9292]' : ''} ${index === DAYS.length - 1 ? 'text-[#61C2FF]' : ''}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

interface CalendarBodyProps {
  className?: string;
}
export const CalendarBody: React.FC<CalendarBodyProps> = ({
  className = 'h-[54px]',
}) => {
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
      return (
        <div
          className={`w-full text-center font-medium text-sm grid place-items-center ${className}`}
          key={index}
        >
          {day}
        </div>
      );
    });
  };

  return <div className={'w-full h-fit grid grid-cols-7'}>{renderDays()}</div>;
};

const CombineDaysBtn = () => {
  const { openModal } = useModalStore();
  return (
    <button
      onClick={() => openModal('packTripsModal')}
      className={'is-active-green-button h-[58px] text-lg my-3'}
    >
      일정을 하나로 묶어보세요!
    </button>
  );
};
