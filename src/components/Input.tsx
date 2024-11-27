import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  labelStyle?: string;
  inputStyle?: string;
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
  errorStyle?: string;
  isSubmit?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  labelStyle = 'text-xs',
  inputStyle = 'h-10 text-xs',
  value = '',
  setValue = () => {},
  error = false,
  errorStyle = 'text-sm',
  isSubmit = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // 전화번호일 경우 숫자만 입력 가능 && 11자 제한
    if (type === 'tel' && /[^0-9]/.test(newValue)) {
      return;
    }
    if (type === 'tel' && newValue.length > 11) {
      newValue = newValue.slice(0, 11);
    }

    setValue(newValue);
  };

  return (
    <div className={'flex flex-col gap-1.5 w-full relative'}>
      <div className={`${labelStyle}`}>{label}</div>
      <input
        style={
          isSubmit && error
            ? {
                outlineColor: '#FFB4B4',
                outlineWidth: '1px',
                outlineStyle: 'solid',
                boxShadow: '0px 0px 8px rgba(255, 180, 180, 0.5)',
              }
            : {}
        }
        className={`relative w-full rounded-[10px] bg-[#F5F5F5] px-3 focus:outline focus:outline-1 focus:outline-primary ${inputStyle}`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e)}
      />

      {isSubmit && error && (
        <div
          className={`absolute top-full pt-0.5 text-error font-semibold ${errorStyle}`}
        >
          필수 입력 항목입니다.
        </div>
      )}
    </div>
  );
};

export default Input;
