import React from 'react';

interface IconBackProps {
  width: number;
  height: number;
}

const IconBack: React.FC<IconBackProps> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 2L7 12L17 22"
        stroke="black"
        stroke-width="1.39535"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default IconBack;
