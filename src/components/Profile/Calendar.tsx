import React from 'react';
import { BoxWrapper } from '../../pages/ProfilePage';
import IconLeft from '../../icons/ProfilePage/IconLeft';
import IconRight from '../../icons/ProfilePage/IconRight';

const Calendar: React.FC = () => {
  const [dateInfo, setDateInfo] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  return (
    <div className={'flex flex-col gap-[14px]'}>
      <div className={'font-semibold'}>캘린더</div>
      <BoxWrapper className="flex flex-col px-4 py-6 items-center gap-5">
        <CalendarHeader dateInfo={dateInfo} setDateInfo={setDateInfo} />
        <DaysOfWeek />
        <CalendarBody dateInfo={dateInfo} />
      </BoxWrapper>
      <CombineDaysBtn />
    </div>
  );
};

export default Calendar;

interface CalendarHeaderProps {
  dateInfo: {
    year: number;
    month: number;
  };
  setDateInfo: React.Dispatch<
    React.SetStateAction<{ year: number; month: number }>
  >;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  dateInfo,
  setDateInfo,
}) => {
  const { year, month } = dateInfo;
  const handleClickArrow = (isLeft: boolean) => {
    if (isLeft) {
      setDateInfo((prev) => {
        if (prev.month === 1) {
          return { year: prev.year - 1, month: 12 };
        }
        return { year: prev.year, month: prev.month - 1 };
      });
    } else {
      setDateInfo((prev) => {
        if (prev.month === 12) {
          return { year: prev.year + 1, month: 1 };
        }
        return { year: prev.year, month: prev.month + 1 };
      });
    }
  };
  return (
    <div className={'flex gap-[14px] items-center'}>
      <IconLeft onClick={() => handleClickArrow(true)} />
      <div className={'text-xxl font-semibold'}>
        {year}년 {month}월
      </div>
      <IconRight onClick={() => handleClickArrow(false)} />
    </div>
  );
};

const DaysOfWeek = () => {
  const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div className={'w-full h-14 grid grid-cols-7 place-items-center relative'}>
      <div
        className={
          'absolute w-[calc(100%-32px)] h-[1.5px] bg-second-light/15 top-full'
        }
      ></div>
      {DAYS.map((day, index) => (
        <div
          key={index}
          className={'w-full text-center text-second-light font-medium'}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

interface CalendarBodyProps {
  dateInfo: {
    year: number;
    month: number;
  };
}
const CalendarBody: React.FC<CalendarBodyProps> = ({ dateInfo }) => {
  const { year, month } = dateInfo;

  // 해당 달의 1일의 요일
  const firstDay = new Date(year, month - 1, 1).getDay();

  // 해당 달의 마지막 날
  const lastDay = new Date(year, month, 0).getDate();

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
          className={'w-full text-center h-[54px] font-medium text-sm'}
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
  return (
    <button className={'is-active-green-button h-[58px] text-lg my-3'}>
      일정을 하나로 묶어보세요!
    </button>
  );
};
