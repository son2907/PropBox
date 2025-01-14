import { useState, useEffect } from "react";

const useCountdownTimer = (initialTime: number) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (isTimerActive && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer); // Cleanup 시에도 timer가 존재하면 clearInterval
    };
  }, [isTimerActive, timeRemaining]);

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const resetTimer = () => {
    setTimeRemaining(initialTime);
    setIsTimerActive(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`;
  };

  return {
    timeRemaining,
    startTimer,
    resetTimer,
    formatTime,
    isTimerActive,
  };
};

export default useCountdownTimer;
