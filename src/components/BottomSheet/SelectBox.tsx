import React, { useState } from 'react';

interface SelectBoxProps {
  leftText: string;
  rightText: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({ leftText, rightText }) => {
  const boxItems: string[] = [leftText, rightText];

  const [selectedItemIndex, setSelectedItemIndex] = useState<Number>(0);

  return (
    <div
      className={
        'w-[140px] h-[52px] bg-white shadow-xxs rounded-full flex px-[22px] justify-between items-center'
      }
    >
      {boxItems.map((boxItem, boxIndex) => {
        return (
          <div
            key={boxIndex}
            className={`${boxIndex === selectedItemIndex ? 'font-semibold text-second' : 'font-normal text-[#CCCCCC]'} relative`}
            onClick={() => {
              setSelectedItemIndex(boxIndex);
            }}
          >
            {boxItem}
            <div
              className={`w-1 h-1 bg-primary rounded-full absolute right-1/2 -top-1.5 ${boxIndex === selectedItemIndex ? 'visible' : 'invisible'}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectBox;
