import { useEffect, useReducer, useState } from "react";
import "./pomodoro.page.css";

import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

import { reducer, initialState } from "../components/pomodoroReducer";
import { formatTime, calculateProgress } from "../utils/timeUtils";

export const PomodoroPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let interval: number;
    if (state.isRunning && state.timeLeft > 0) {
      interval = window.setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isRunning, state.timeLeft]);

  const circumference = 2 * Math.PI * 100;
  const progress = calculateProgress(state.timeLeft, state.isBreak);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <main className={`timer ${theme}`}>
      <button
        className="timer__button timer__button--theme"
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      >
        <img
          src={theme === "dark" ? sun : moon}
          className={
            theme === "dark"
              ? "timer__button--theme--imgDark"
              : "timer__button--theme--imgLight"
          }
          alt="noche / dia"
        />
      </button>

      <div className="timer__background-circle timer__background-circle--top-right"></div>
      <div className="timer__background-circle timer__background-circle--bottom-left"></div>

      <section className="timer__container">
        <h1 className="timer__title">Pomodoro Tracker</h1>

        <article className="timer__circle">
          <svg width="220" height="220" className="timer__progress">
            <circle
              className={
                state.isBreak && state.isRunning
                  ? "timer__progress-background--break"
                  : "timer__progress-background"
              }
              cx="110"
              cy="110"
              r="100"
            />
            <circle
              className={
                state.isBreak && state.isRunning
                  ? "timer__progress-circle--break"
                  : "timer__progress-circle"
              }
              cx="110"
              cy="110"
              r="100"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <span className="timer__cycle-count">{state.cycleCount}x</span>
          <div className={state.isBreak && state.isRunning ? "timer__time--break" : "timer__time"}>
            {formatTime(state.timeLeft)}
          </div>
        </article>

        <div className="timer__buttons">
          <button
            className="timer__button timer__button--break"
            onClick={() => {
              state.isBreak
                ? dispatch({ type: "START_POMODORO" })
                : dispatch({ type: "START_BREAK" });
            }}
          >
            {state.isBreak ? "Start Pomodoro" : "Start Break"}
          </button>

          <button
            className={`timer__button ${state.isRunning ? 'timer__button--pause' : 'timer__button--pause'}`}
            
            onClick={() => dispatch({ type: "TOGGLE_RUNNING" })}
          >
            {state.isBreak
              ? state.isRunning
                ? "Pause Break"
                : "Resume Break"
              : state.isRunning
              ? "Pause Pomodoro"
              : "Resume Pomodoro"}
          </button>
        </div>
      </section>
    </main>
  );
};
