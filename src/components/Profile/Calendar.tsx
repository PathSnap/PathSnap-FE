import React, { useEffect, useRef, useState } from 'react';
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

  const yearContainer = useRef<HTMLDivElement>(null);

  const MONTHS: number[] = [];
  const monthsList = () => {
    for (let i = 1; i <= 12; i++) {
      MONTHS.push(i);
    }
    return (
      <div className={'grid grid-cols-3 grid-rows-4 gap-2.5'}>
        {MONTHS.map((month, index) => (
          <div
            onClick={() => setSelectedDate({ selectedMonth: month })}
            key={index}
            className={`rounded-[10px] border grid place-items-center h-[50px] ${
              selectedMonth === month
                ? 'text-primary border-primary'
                : 'text-[#D5D5D5]'
            }`}
          >
            {month}월
          </div>
        ))}
      </div>
    );
  };
  const years = [selectedYear];
  const YearList = () => {
    for (let i = 1; i <= 10; i++) {
      years.unshift(selectedYear - i);
      years.push(selectedYear + i);
    }

    return (
      <div
        ref={yearContainer}
        className={'overflow-x-scroll max-w-full flex gap-3'}
      >
        {years.map((year, index) => (
          <div
            onClick={() => setSelectedDate({ selectedYear: year })}
            key={index}
            className={`flex-shrink-0 text-xl ${
              selectedYear === year
                ? 'text-primary'
                : selectedYear - 1 === year || selectedYear + 1 === year
                  ? 'text-[#BDBDBB]'
                  : 'text-[#EEEEEE]'
            }`}
          >
            {year}년
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    if (yearContainer.current) {
      const selectedIndex = years.indexOf(selectedYear);
      const selectedElement = yearContainer.current.children[selectedIndex];
      if (selectedElement) {
        // container의 너비
        const containerWidth = yearContainer.current.offsetWidth;
        // 선택된 요소의 왼쪽 위치
        const selectedElementOffset = (selectedElement as HTMLElement)
          .offsetLeft;

        // 스크롤 중앙 정렬 계산
        const scrollPosition = selectedElementOffset - containerWidth / 2;
        yearContainer.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth', // 부드럽게 스크롤
        });
      }
    }
  }, [selectedYear, years]);

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
        <div className="w-full h-[calc(100%-80px)] absolute top-20 bg-white z-10 rounded-2xl">
          <div className={'w-full h-full flex flex-col p-6 border-t gap-6'}>
            {YearList()}
            {monthsList()}
          </div>
        </div>
      )}
    </div>
  );
};

interface DaysOfWeekProps {
  className?: string;
}
export const DaysOfWeek: React.FC<DaysOfWeekProps> = ({
  className = 'h-14',
}) => {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div
      className={`w-full grid grid-cols-7 place-items-center relative ${className}`}
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
