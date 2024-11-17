import React, { useEffect } from 'react';
import useModalStore from '../../stores/ModalStore';

interface ModalBackgroundProps {
  children: React.ReactNode;
}

const ModalBackground: React.FC<ModalBackgroundProps> = ({ children }) => {
  const { closeModal } = useModalStore();
  const preventScroll = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  };
  const allowScroll = () => {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  };

  useEffect(() => {
    preventScroll();
    return () => {
      allowScroll();
    };
  }, []);

  return (
    <div
      className="max-w-[500px] min-w-[375px] w-full fixed inset-0 mx-auto bg-black/60 z-50 overflow-hidden"
      onClick={() => {
        closeModal();
      }}
    >
      <div className="h-full w-full overflow-y-auto grid grid-cols-[auto_1fr_auto] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] place-items-center">
        {children}
      </div>
    </div>
  );
};

export default ModalBackground;
