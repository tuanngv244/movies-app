import { useEffect } from 'react';
import { VoidFunc } from 'types/general';

export const useInterval = (cb: VoidFunc, timer: number) => {
  useEffect(() => {
    const interval = setInterval(() => {
      cb();
    }, timer);

    return () => clearInterval(interval);
  });
};
