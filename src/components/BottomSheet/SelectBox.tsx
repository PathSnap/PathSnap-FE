import React from 'react';

interface SelectBoxProps {
  leftText: string;
  rightText: string;
  selectedBoxIndex: Number;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  leftText,
  rightText,
  selectedBoxIndex,
}) => {
  const boxItems: string[] = [leftText, rightText];

  return (
    <div
      className={
        'w-full h-[52px] bg-white shadow-xxs rounded-full px-[22px] pt-0.5 grid grid-cols-2 items-center'
      }
    >
      {boxItems.map((boxItem, boxIndex) => {
        return (
          <div
            key={boxIndex}
            className={`${boxIndex === selectedBoxIndex ? 'font-semibold text-second' : 'font-normal text-[#CCCCCC]'} relative text-center`}
          >
            {boxItem}
            <div
              className={`w-1 h-1 bg-primary rounded-full absolute right-1/2 -top-1 ${boxIndex === selectedBoxIndex ? 'visible' : 'invisible'}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectBox;
