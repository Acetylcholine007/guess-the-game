import { useCallback, useEffect, useRef, useState } from 'react';

const curveFunction = (x: number) => {
  return (1 / 800) * Math.pow(x, 2);
};

const curveFunction2 = (x: number) => {
  return (1 / 1200) * Math.pow(x, 2);
};

export default function useMeter(ceiling: number, speed: number) {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const meterRef = useRef<HTMLMeterElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  const startHandler = useCallback(() => setStart(true), []);
  const resetHandler = useCallback(() => {
    setStart(false);
    if (meterRef.current) meterRef.current.value = 0;
    if (dotRef.current) {
      dotRef.current.setAttribute('cx', '0');
      dotRef.current.setAttribute('cy', '200');
      dotRef.current.setAttribute('cy', '200');
      lineRef.current?.setAttribute('stroke-dash-array', `$0% 150%`);
    }
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
        dotRef.current!.setAttribute(
          'cx',
          ((meterRef.current.value / 10) * 390).toString()
        );
        dotRef.current!.setAttribute(
          'cy',
          (200 - (curveFunction(meterRef.current.value) / 0.125) * 190).toFixed(
            2
          )
        );
        lineRef.current!.setAttribute(
          'stroke-dasharray',
          `${(meterRef.current.value / 10) * 136}% 150%`
        );
      }
    }, 10 / speed);

    return () => {
      clearInterval(interval);
    };
  }, [start, speed]);

  return { count, meterRef, lineRef, dotRef, resetHandler, startHandler };
}
