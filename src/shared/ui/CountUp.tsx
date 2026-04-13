import { useEffect, useRef, useState } from 'react';

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
}

/**
 * Animates a number from 0 → `to` using ease-out cubic.
 * Used with client:visible so it fires when the card enters the viewport.
 */
export default function CountUp({ to, suffix = '', duration = 1400 }: Props) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [to, duration]);

  return (
    <span className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
