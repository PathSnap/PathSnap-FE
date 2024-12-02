import React from 'react';

interface IconArrowProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
  direction?: 'left' | 'right'; // 방향 설정
  onClick?: () => void; // 선택적 속성으로 추가
}

const IconArrow: React.FC<IconArrowProps> = ({
  width = 12,
  height = 22,
  color = 'black',
  className,
  direction = 'left', // 기본 방향은 left
  onClick,
}) => {
  // 오른쪽 방향일 경우 회전 스타일 추가
  const rotationStyle = direction === 'right' ? 'transform rotate-180' : '';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotationStyle}`}
      onClick={onClick} // onClick 이벤트 바인딩
    >
      <path
        d="M11 1L1 11L11 21"
        stroke={color}
        strokeWidth="1.39535"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconArrow;
