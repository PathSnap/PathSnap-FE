import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  labelStyle?: string;
  inputStyle?: string;
  value?: string;
  setValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  labelStyle = 'text-xs',
  inputStyle = 'h-10',
  value = '',
  setValue = () => {},
}) => {
  return (
    <div className={'flex flex-col gap-1.5 w-full'}>
      <div className={`${labelStyle}`}>{label}</div>
      <input
        className={`relative *:w-full rounded-[10px] bg-[#F5F5F5] px-3 focus:outline focus:outline-1 focus:outline-primary ${inputStyle}`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
