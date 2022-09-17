import { useEffect } from 'react';

export const useListennerEvent = <K extends keyof GlobalEventHandlersEventMap>(ref: any, event: K, fn: (e: any) => void) => {
  useEffect(() => {
    const listener: any = (e: any) => {
      if (!ref || ref.current?.contains(e.target)) return;
      fn(e);
    }

    document.addEventListener(event, listener);

    return () => {
      document.removeEventListener(event, listener);
    }
  }, [event, fn, ref])
}