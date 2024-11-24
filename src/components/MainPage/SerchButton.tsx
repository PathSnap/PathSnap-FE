import React from "react";
import { useNavigate } from "react-router-dom";

const SerchButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/serch");
  };

  return (
    <div className="absolute top-2 right-2">
      <svg
        onClick={handleClick}
        width="70"
        height="70"
        viewBox="0 0 70 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer" // 클릭 시 커서를 포인터로 표시
      >
        <g filter="url(#filter0_d_700_3165)">
          <rect x="9" y="9" width="52" height="52" rx="26" fill="white" />
          <circle
            cx="34.6055"
            cy="34.1053"
            r="8.5"
            stroke="#BFC5D1"
            strokeWidth="2"
          />
          <path
            d="M41.1055 41.6053L44.8949 45.3948"
            stroke="#BFC5D1"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_700_3165"
            x="0"
            y="0"
            width="70"
            height="70"
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
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect1_dropShadow_700_3165"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_700_3165"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_700_3165"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default SerchButton;
