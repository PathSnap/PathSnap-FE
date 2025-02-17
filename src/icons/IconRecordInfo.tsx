import React from 'react';
import IconClose from './IconClose';
import { useNavigate } from 'react-router';

interface RecordInfoProps {
  title: string; // 왼쪽 텍스트 (여행 제목)
  number: number; // 오른쪽 텍스트 (숫자)
  width?: string; // 너비 (선택적, 예: "200px" 또는 "w-[180px]")
}

const RecordInfo: React.FC<RecordInfoProps> = ({
  title,
  number,
  width = '180',
}) => {
  const Navigate = useNavigate();
  return (
    <div
      className={`w-[${width}px] h-[52px] bg-white shadow-xxs rounded-full flex px-[22px] justify-between items-center pt-0.5`}
    >
      <div className="font-semibold text-gray-700 mr-[10px]">{title}</div>
      <div className="font-normal text-[#CCCCCC]">{number}곳</div>
      {/* <IconClose
        className="ml-[10px]"
        onClick={() => {
          console.log('close');
          Navigate('/', {});
          window.location.reload();
        }}
      /> */}
    </div>
  );
};

export default RecordInfo;
