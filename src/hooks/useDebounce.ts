import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  // A function that returns the value only when left unchanged for the specified delay.
  // No need to spam API requests on each keystroke!
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
