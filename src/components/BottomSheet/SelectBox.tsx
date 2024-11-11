import React from 'react';

interface SelectBoxProps {
  leftText: string;
  rightText: string;
  selectedBoxIndex: Number;
  setSelectedBoxIndex: Function;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  leftText,
  rightText,
  selectedBoxIndex,
  setSelectedBoxIndex,
}) => {
  const boxItems: string[] = [leftText, rightText];

  return (
    <div
      className={
        'w-[140px] h-[52px] bg-white shadow-xxs rounded-full flex px-[22px] justify-between items-center pt-0.5'
      }
    >
      {boxItems.map((boxItem, boxIndex) => {
        return (
          <div
            key={boxIndex}
            className={`${boxIndex === selectedBoxIndex ? 'font-semibold text-second' : 'font-normal text-[#CCCCCC]'} relative`}
            onClick={() => {
              setSelectedBoxIndex(boxIndex);
            }}
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
