import React from 'react';

interface ModalWrapperProps {
  classProp: string;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ classProp, children }) => {
  return (
    <div
      className={`relative col-start-2 row-start-2  flex flex-col items-center ${classProp}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
