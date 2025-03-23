import { useEffect, useState } from 'react';
import './pomodoro.page.css';

export const PomodoroPage = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval: number;

        if (isRunning && timeLeft > 0) {
        interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        }

        return () => {
        if (interval) {
            clearInterval(interval);
        }
        };
    }, [isRunning, timeLeft]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const togglePause = () => {
        setIsRunning(false);
    }

    const startBreak = () => {
        setTimeLeft(5 * 60);
        setIsBreak(true);
        setIsRunning(true);
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const calculateProgress = (): number => {
        const totalTime = isBreak ? 5 * 60 : 25 * 60;
        return ((totalTime - timeLeft) / totalTime) * 100;
    };

    const circumference = 2 * Math.PI * 100;
    const offset = circumference - (calculateProgress() / 100) * circumference;
  return (
    <main className="timer">
    <div className="timer__background-circle timer__background-circle--top-right"></div>
    <div className="timer__background-circle timer__background-circle--bottom-left"></div>
    
    <section className="timer__container">
        <h1 className="timer__title">Pomodoro Tracker</h1>
        
        <article className="timer__circle">
          <svg width="220" height="220" className="timer__progress">
            <circle
              className="timer__progress-background"
              cx="110"
              cy="110"
              r="100"
            />
            <circle
              className="timer__progress-circle"
              cx="110"
              cy="110"
              r="100"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="timer__time">{formatTime(timeLeft)}</div>
        </article>
        
        {!isRunning && !isBreak ? (
            <>
                {!isBreak ? 
                (
                <button 
                className={`timer__button ${isRunning ? 'timer__button--pause' : ''}`}
                onClick={toggleTimer}
                >
                Start Pomodoro
                </button>
                ) :(
                <button 
                className={`timer__button ${isRunning ? 'timer__button--pause' : ''}`}
                onClick={toggleTimer}
                >
                Start Break
                </button>
                )}
                
                <button 
                className={`timer__button timer__button--pause`}
                onClick={toggleTimer}
                >
                Pause Pomodoro
                </button>
            </>
        ) : (
<>
            {!isRunning ? (
                <button 
                className={`timer__button ${isRunning ? 'timer__button--pause' : ''}`}
                onClick={toggleTimer}
                >
                Start Pomodoro
                </button>
            ):(
                <button 
                className="timer__button timer__button--break" 
                onClick={startBreak}
              >
                Start Break
              </button>
            )}
    
            {!isRunning ? (
                <button 
                className={`timer__button timer__button--pause`}
                onClick={toggleTimer}
                >
                Resume Pomodoro
                </button>
            ):(
                <button 
                className={`timer__button timer__button--pause`}
                onClick={togglePause}
                >
                Pause Pomodoro
                </button>
            )}
            </>
        )
        }


        
        {/* {!isBreak && (
         
         <button 
            className="timer__button timer__button--break" 
            onClick={startBreak}
          >
            Start Break
          </button>
        )} */}
        
    </section>
  </main>
  )
}