import React from 'react';

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
}

const IconDelete: React.FC<IconProps> = ({
  width = 14,
  height = 14,
  stroke = '#595959',
  strokeOpacity = 0.3,
  strokeWidth = 1.39535,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1.00012L12.7733 12.7734"
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M12.7734 1.00012L1.00018 12.7734"
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconDelete;
