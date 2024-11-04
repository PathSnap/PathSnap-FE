import React from 'react';

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton: React.FC<CurrentLocationButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="relative">
      <div style={{ zIndex: 1000 }} className="absolute bottom-[150px] right-2">
        <button
          onClick={onClick}
          className="h-[44px] w-[44px] bg-[#FFFFFF] rounded-full shadow-lg flex items-center justify-center"
        >
          {/* 현재 위치 아이콘 */}
          <div className="relative flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#FFFFFF]">
            {/* 내부 원 */}
            <div className="absolute h-[24px] w-[24px] rounded-full border-2 border-[#BFC5D1]"></div>

            {/* 수직 선 (위쪽과 아래쪽에 위치) */}
            <div
              className="absolute mt-[8px] h-[4px] w-[2px] bg-[#BFC5D1]"
              style={{ top: '3px' }}
            ></div>
            <div
              className="absolute mb-[8px] h-[4px] w-[2px] bg-[#BFC5D1]"
              style={{ bottom: '3px' }}
            ></div>

            {/* 수평 선 (왼쪽과 오른쪽에 위치) */}
            <div
              className="absolute ml-[8px] h-[2px] w-[4px] bg-[#BFC5D1]"
              style={{ left: '3px' }}
            ></div>
            <div
              className="absolute mr-[8px] h-[2px] w-[4px] bg-[#BFC5D1]"
              style={{ right: '3px' }}
            ></div>

            {/* 중심점 */}
            <div className="absolute h-[4px] w-[4px] rounded-full bg-[#BFC5D1]"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CurrentLocationButton;
