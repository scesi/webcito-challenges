import { useState, useEffect } from "react";

type TimerMode = "pomodoro" | "break";

export default function Timer() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const totalTime = mode === "pomodoro" ? 25 * 60 : 5 * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCompletedCount((count) => count + 1);
      handleReset();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "pomodoro" ? 25 * 60 : 5 * 60);
  };

  const toggleMode = () => {
    const newMode = mode === "pomodoro" ? "break" : "pomodoro";
    setMode(newMode);
    setTimeLeft(newMode === "pomodoro" ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0E1628]">
      <div className="bg-[#121C2F] shadow-lg rounded-2xl p-8 w-80 text-center relative">
        <h1 className="text-white text-xl font-bold mb-6">Pomodoro Tracker</h1>

        <div className="relative w-60 h-60 mx-auto mb-6">
          <svg width="240" height="240" className="absolute inset-0 transform -rotate-90">
            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="#2D3748"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke={mode === "pomodoro" ? "#A020F0" : "#00FFAB"}
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-mono text-white">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-sm text-white mt-1">1x</span>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={isRunning ? handlePause : handleStart}
            className={`py-2 rounded-md text-white font-semibold transition-colors ${
              mode === "pomodoro"
                ? "bg-purple-700 hover:bg-purple-600"
                : "bg-emerald-500 hover:bg-emerald-400"
            }`}
          >
            {isRunning ? "Pause" : "Start"}{" "}
            {mode === "pomodoro" ? "Pomodoro" : "Break"}
          </button>

          <button
            onClick={toggleMode}
            className="py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 text-sm"
          >
            Switch to {mode === "pomodoro" ? "Break" : "Pomodoro"}
          </button>
        </div>

        {completedCount > 0 && (
          <div className="mt-4 text-gray-400 text-sm">
            Completed: {completedCount}{" "}
            {mode === "pomodoro" ? "Pomodoros" : "Breaks"}
          </div>
        )}
      </div>
    </div>
  );
}
