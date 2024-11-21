import React from 'react';

interface IconMenuProps {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const IconMenu: React.FC<IconMenuProps> = ({ width, height, onClick }) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 5 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="3" r="2.5" fill="#D1D1D6" />
      <circle cx="2.5" cy="14" r="2.5" fill="#D1D1D6" />
      <circle cx="2.5" cy="25" r="2.5" fill="#D1D1D6" />
    </svg>
  );
};

export default IconMenu;
