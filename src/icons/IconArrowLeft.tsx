import React from 'react';

interface IconArrowLeftProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const IconArrowLeft: React.FC<IconArrowLeftProps> = ({
  width = 12,
  height = 22,
  color = 'black',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

export default IconArrowLeft;
