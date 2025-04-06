export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };
  
  export const calculateProgress = (
    timeLeft: number,
    isBreak: boolean
  ): number => {
    const totalTime = isBreak ? 5 * 60 : 25 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };
  