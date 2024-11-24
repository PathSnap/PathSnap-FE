import React from 'react';

interface IconRightProps {
  onClick?: () => void;
}

const IconRight: React.FC<IconRightProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="#BFC5D1"
        strokeWidth="1.39535"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default IconRight;
