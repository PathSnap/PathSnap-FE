import useModalStore from '../stores/Modals/ModalStore';

const IconModalClose = () => {
  const { closeModal } = useModalStore();
  return (
    <svg
      onClick={closeModal}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.92969 22.1832L12.668 13.4449L21.4064 22.1832M21.4064 4.70654L12.6664 13.4449L3.92969 4.70654"
        stroke="#BFC5D1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconModalClose;
