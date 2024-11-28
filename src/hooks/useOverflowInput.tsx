import { useEffect, useRef, useState } from 'react';

const useOverflowInput = (value: string) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      setIsOverflowing(inputElement.scrollWidth > inputElement.clientWidth);
    }
  }, [value]);

  return { inputRef, isOverflowing };
};

export default useOverflowInput;
