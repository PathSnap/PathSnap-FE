import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconSearch from '../../icons/IconSerch'; // IconSearch 컴포넌트 가져오기

const SerchButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/serch');
  };

  return (
    <div className="absolute top-2 right-2">
      <div onClick={handleClick} className="cursor-pointer">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_700_3165)">
            <rect x="9" y="9" width="52" height="52" rx="26" fill="white" />
            {/* IconSearch 컴포넌트 삽입 */}
            <foreignObject x="21" y="21" width="28" height="28">
              <IconSearch width={28} height={28} color="#BFC5D1" />
            </foreignObject>
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
    </div>
  );
};

export default SerchButton;
