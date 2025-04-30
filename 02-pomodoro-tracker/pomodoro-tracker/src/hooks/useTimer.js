import { useState, useEffect } from 'react';

const useTimer = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = (newSeconds) => {
    setIsRunning(false);
    setSeconds(newSeconds);
  };

  return { seconds, start, stop, reset };
};

export default useTimer;
