import { useState, useEffect } from 'react'

export function useDebounce(value: any, delay = 300, fn: () => void) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounceValue(value);
      fn();
    }, delay)

    return () => {
      clearTimeout(timer);
    }
  }, [delay, value]);

  // useEffect(() => {
  //   const timer = window.setTimeout(() => {
  //     setDebounceValue(value);
  //   }, delay)

  //   return () => {
  //     clearTimeout(timer);
  //   }
  // }, [value])

  return debounceValue;
}