import React, { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

interface DropDownItem {
  name: string;
  onClick: () => void;
  component: React.FC;
}

interface DropdownProps {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownItems: DropDownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({
  setIsDropdownOpen,
  dropdownItems,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div
      ref={dropdownRef}
      className="w-40 h-fit absolute right-0 top-full flex flex-col border border-[#D6DCE9] rounded-[10px] bg-white z-40 shadow-xxs focus:outline-none"
    >
      {dropdownItems.map((dropdownItem, dropdownIndex) => {
        const Component = dropdownItem.component;
        return (
          <div
            key={dropdownIndex}
            onClick={dropdownItem.onClick}
            className="py-3 px-[14px] flex justify-between items-center first:border-b border-[#D6DCE9]"
          >
            <div className="text-second text-sm">{dropdownItem.name}</div>
            <Component />
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
