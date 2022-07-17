import { useEffect } from 'react';

export const useClickOutSide = (ref: any, fn: () => void) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref || ref.current.contains(e.target)) return;
      fn();
    }

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    }
  }, [ref])
}