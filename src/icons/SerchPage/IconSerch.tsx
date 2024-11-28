import React from 'react';

interface IconSearchProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const IconSearch: React.FC<IconSearchProps> = ({
  width = 24,
  height = 24,
  color = 'black',
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="24" height="24" fill="white" />
      <circle
        cx="11.5"
        cy="11.5"
        r="8.5"
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <path
        d="M18 19L21.7895 22.7895"
        stroke={color}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconSearch;
