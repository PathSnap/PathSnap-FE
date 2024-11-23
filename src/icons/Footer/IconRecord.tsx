import React from 'react';

const IconStartRecord = () => {
  return (
    <svg
      className="translate-x-0.5"
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 10.2679C21.3333 11.0378 21.3333 12.9623 20 13.7321L3.5 23.2583C2.16666 24.0281 0.499999 23.0659 0.499999 21.5263L0.5 2.47372C0.5 0.934117 2.16667 -0.0281316 3.5 0.741669L20 10.2679Z"
        fill="white"
      />
    </svg>
  );
};

const IconStopRecord = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="2" fill="white" />
    </svg>
  );
};

interface IconRecordProps {
  isRecording: boolean;
}

const IconRecord: React.FC<IconRecordProps> = ({ isRecording }) => {
  return isRecording ? <IconStopRecord /> : <IconStartRecord />;
};

export default IconRecord;
