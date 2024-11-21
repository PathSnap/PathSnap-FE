import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  labelStyle?: string;
  inputStyle?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  labelStyle = 'text-xs',
  inputStyle = 'h-10',
}) => {
  return (
    <div className={'flex flex-col gap-1.5 w-full'}>
      <div className={`${labelStyle}`}>{label}</div>
      <input
        className={`w-full rounded-[10px] bg-[#F5F5F5] px-3 focus:outline focus:outline-1 focus:outline-primary ${inputStyle}`}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default Input;
