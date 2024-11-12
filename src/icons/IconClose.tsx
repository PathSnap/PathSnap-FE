import React from 'react';

interface IconCloseProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  className?: string;
}

const IconClose: React.FC<IconCloseProps> = ({
  width = 20,
  className = '',
}) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      y="0.0698242"
      width="20"
      height="20"
      rx="10"
      fill="black"
      fillOpacity="0.15"
    />
    <path
      d="M6 6.06982L14 14.0698"
      stroke="white"
      strokeWidth="1.39535"
      strokeLinecap="round"
    />
    <path
      d="M14 6.06982L6 14.0698"
      stroke="white"
      strokeWidth="1.39535"
      strokeLinecap="round"
    />
  </svg>
);

export default IconClose;
