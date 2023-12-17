import { useState, useEffect } from 'react';

export default function useRealTimeClock(showSeconds?: boolean) {
  const [currentTime, setCurrentTime] = useState<string>('');

  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    if (showSeconds) setCurrentTime(`${hours}:${minutes}:${seconds}`);
    else setCurrentTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentTime;
}
