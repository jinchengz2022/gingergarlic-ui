import { useEffect } from 'react';

export const useListennerEvent = (ref: any, event: keyof GlobalEventHandlersEventMap, fn: () => void) => {
  useEffect(() => {
    const listener: any = (e: MouseEvent) => {
      if (!ref || ref.current.contains(e.target)) return;
      fn();
    }

    document.addEventListener(event, listener);

    return () => {
      document.removeEventListener(event, listener);
    }
  }, [event, fn, ref])
}