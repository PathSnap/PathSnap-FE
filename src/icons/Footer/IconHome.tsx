import React from 'react';

interface IconHomeProps {
  isActive: boolean;
}

const IconHome: React.FC<IconHomeProps> = ({ isActive }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Home Icon"
    >
      <rect width="24" height="24" transform="translate(0 0.5)" fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.73352 9.31572C1.26925 9.69558 1 10.2638 1 10.8636V21.9159C1 23.0204 1.89543 23.9159 3 23.9159H21C22.1046 23.9159 23 23.0204 23 21.9159V10.8636C23 10.2638 22.7307 9.69558 22.2665 9.31572L13.2665 1.95209C12.5297 1.3493 11.4703 1.3493 10.7335 1.95209L1.73352 9.31572ZM12 13.9159C10.3431 13.9159 9 15.2591 9 16.9159V21.9159H15V16.9159C15 15.2591 13.6569 13.9159 12 13.9159Z"
        fill={isActive ? '#77CEBD' : '#BFC5D1'}
      />
    </svg>
  );
};

export default IconHome;
