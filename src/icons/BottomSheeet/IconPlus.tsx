import React from 'react';

interface IconPlusProps {
  width: number;
  height: number;
}

const IconPlus: React.FC<IconPlusProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 13H24"
        stroke="#9DCED1"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M13 2L13 24"
        stroke="#9DCED1"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconPlus;
