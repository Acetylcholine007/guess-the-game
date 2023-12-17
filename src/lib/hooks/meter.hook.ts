import { useCallback, useEffect, useRef, useState } from 'react';

export default function useMeter(ceiling: number, speed: number) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const meterRef = useRef<HTMLMeterElement>(null);

  const startHandler = useCallback(() => setStart(true), []);
  const resetHandler = useCallback(() => {
    setStart(false);
    if (meterRef.current) meterRef.current.value = 0;
    setCount(0);
  }, []);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      if (meterRef.current?.value.toFixed(2) === ceiling.toFixed(2)) {
        setStart(false);
        setCount(meterRef.current.value);
      } else if (meterRef.current) {
        meterRef.current.value += 0.01;
      }
    }, 10 / speed);

    return () => {
      clearInterval(interval);
    };
  }, [start, speed]);

  return { count, meterRef, resetHandler, startHandler };
}
