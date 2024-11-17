import React, { ReactNode } from 'react';

interface RecordWrapperProps {
  children: ReactNode;
  className?: string;
}
const RecordWrapper: React.FC<RecordWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-full h-[170px] rounded-2xl relative flex-shrink-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default RecordWrapper;
