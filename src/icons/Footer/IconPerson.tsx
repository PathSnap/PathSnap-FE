const ActiveIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_700_4726)">
        <rect width="24" height="24" fill="white" />
        <path
          d="M20 23.5789C21.1046 23.5789 22.0156 22.6786 21.8509 21.5863C21.4991 19.2552 20.5357 17.0873 19.0711 15.3914C17.1957 13.2199 14.6522 12 12 12C9.34784 12 6.8043 13.2199 4.92893 15.3914C3.46425 17.0873 2.50085 19.2552 2.14914 21.5863C1.98436 22.6786 2.89543 23.5789 4 23.5789L12 23.5789H20Z"
          fill="#77CEBD"
        />
        <circle cx="12" cy="7" r="5" fill="#77CEBD" />
      </g>
      <defs>
        <clipPath id="clip0_700_4726">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const InactiveIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_700_3235)">
        <rect width="24" height="24" fill="white" />
        <mask id="path-1-inside-1_700_3235" fill="white">
          <path d="M20 23.5789C21.1046 23.5789 22.0156 22.6786 21.8509 21.5863C21.4991 19.2552 20.5357 17.0873 19.0711 15.3914C17.1957 13.2199 14.6522 12 12 12C9.34784 12 6.8043 13.2199 4.92893 15.3914C3.46425 17.0873 2.50085 19.2552 2.14914 21.5863C1.98436 22.6786 2.89543 23.5789 4 23.5789L12 23.5789H20Z" />
        </mask>
        <path
          d="M20 23.5789C21.1046 23.5789 22.0156 22.6786 21.8509 21.5863C21.4991 19.2552 20.5357 17.0873 19.0711 15.3914C17.1957 13.2199 14.6522 12 12 12C9.34784 12 6.8043 13.2199 4.92893 15.3914C3.46425 17.0873 2.50085 19.2552 2.14914 21.5863C1.98436 22.6786 2.89543 23.5789 4 23.5789L12 23.5789H20Z"
          stroke="black"
          strokeOpacity="0.5"
          strokeWidth="4"
          mask="url(#path-1-inside-1_700_3235)"
        />
        <circle
          cx="12"
          cy="7"
          r="4"
          stroke="black"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_700_3235">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

interface IconPersonProps {
  isActive: boolean;
}

const IconPerson: React.FC<IconPersonProps> = ({ isActive }) => {
  return isActive ? <ActiveIcon /> : <InactiveIcon />;
};

export default IconPerson;
