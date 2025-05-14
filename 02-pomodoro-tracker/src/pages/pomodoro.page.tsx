import { useEffect, useState } from 'react';

export const PomodoroPage = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning){
            const interval = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }
    },[isRunning])


    const handleStratPomodoro = () => {
        setIsRunning(true);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds}`
    }

  return (
    <main>
        <header>
            <h2>Pomodoro Tracker</h2>
        </header>
        <article>
            {isRunning ?
                <p>{formatTime(time)}</p>
                :
                <p>25:00</p>
            }

            <button onClick={handleStratPomodoro}>Start Pomodoro</button>
            {false &&
                <button>Start Break</button>
            }
            <button>Pause Pomodoro</button>
            {false &&
                <button>Resume Pomodoro</button>
            }
            {false &&
                <button>Stop Break</button>

            }
        </article>
    </main>
  )
}