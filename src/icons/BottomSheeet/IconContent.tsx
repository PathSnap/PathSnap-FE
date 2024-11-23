import React from 'react';

interface IconContentProps {
  onClick: () => void;
}

const IconContent: React.FC<IconContentProps> = ({ onClick }) => {
  return (
    <svg
      onClick={onClick}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_602_5456)">
        <rect
          x="6"
          y="6"
          width="24"
          height="24"
          rx="4"
          fill="white"
          fillOpacity="0.5"
          shapeRendering="crispEdges"
        />
        <path
          d="M11 13H25"
          stroke="#999999"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 18H25"
          stroke="#999999"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 23H18"
          stroke="#999999"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_602_5456"
          x="0"
          y="0"
          width="36"
          height="36"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_602_5456"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_602_5456"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default IconContent;
