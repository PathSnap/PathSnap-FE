import React from 'react';

interface IconCancelProps {
  onClick?: () => void;
  className?: string;
}

const IconCancel: React.FC<IconCancelProps> = ({ onClick, className }) => {
  return (
    <svg
      onClick={onClick}
      className={`${className}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.2637 28.7383L20.002 20L28.7403 28.7383M28.7403 11.2617L20.0003 20L11.2637 11.2617"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconCancel;
