import {useMemo, useEffect} from "react";
import {throttle} from "lodash";

export const useThrottle = <T extends (...args: any) => any>(
  fn: T,
  ms = 1000,
) => {
  const throttledFn = useMemo(() => {
    return throttle(fn, ms);
  }, [fn, ms]);
  // This is must because fn can call setState.
  useEffect(() => {
    return () => {
      throttledFn.cancel();
    };
  }, [throttledFn]);
  return throttledFn;
};
