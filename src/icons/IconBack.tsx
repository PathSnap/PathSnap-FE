import React from 'react';

interface IconBackProps {
  width: number;
  height: number;
  onClick?: () => void;
}

const IconBack: React.FC<IconBackProps> = ({ width, height, onClick }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M17 2L7 12L17 22"
        stroke="black"
        strokeWidth="1.39535"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconBack;
