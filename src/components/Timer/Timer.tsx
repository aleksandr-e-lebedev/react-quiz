import { useEffect } from "react";
import "./Timer.styles.css";

export interface TimerProps {
  className?: string;
  secondsRemaining: number;
  onDecreaseTimer: () => void;
}

export default function Timer(props: TimerProps) {
  const { className, secondsRemaining, onDecreaseTimer } = props;

  const minutes = new Date(secondsRemaining).getMinutes();
  const seconds = new Date(secondsRemaining).getSeconds();

  useEffect(() => {
    const intervalId = setInterval(() => {
      onDecreaseTimer();
    }, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [onDecreaseTimer]);

  return (
    <div className={className ? `timer ${className}` : "timer"}>
      {minutes < 10 ? 0 : ""}
      {minutes}:{seconds < 10 ? 0 : ""}
      {seconds}
    </div>
  );
}
