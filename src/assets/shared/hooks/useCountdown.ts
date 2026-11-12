import { useCallback, useEffect, useRef, useState } from 'react';

export const useCountdown = (initialSeconds: number, onExpire: () => void) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (initialSeconds > 0) onExpireRef.current();
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, initialSeconds]);

  const reset = useCallback(
    (seconds = initialSeconds) => {
      setSecondsLeft(seconds);
    },
    [initialSeconds]
  );

  const formatted = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`;

  return { secondsLeft, formatted, reset };
};
