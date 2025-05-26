import React, { useReducer, useEffect } from 'react';

import useTimer from './useTimer';
import { Pomodoro } from '../components/Pomodoro';

function reducer(state, action) {
  switch (action.type) {
    case 'TO_START_POMODORO':
      return {
        ...state,
        textStart: 'Start Break',
        textPause: 'Pause Pomodoro',
        isPomodoro: true,
        minutesPomodoro: 1500,
      };
    case 'TO_START_BREAK':
      return {
        ...state,
        textStart: 'Start Pomodoro',
        textPause: 'Pause Break',
        isPomodoro: false,
        minutesBreak: 300,
      };
    case 'PAUSE_POMODORO':
      return {
        ...state,
        textStart: 'Start Break',
        textPause: 'Resume Pomodoro',
      };

    case 'PAUSE_BREAK':
      return {
        ...state,
        textStart: 'Start Pomodoro',
        textPause: 'Resume Break',
      };
    default:
      return state;
  }
}

const initialState = {
  textStart: 'Start Pomodoro',
  textPause: 'Pause Pomodoro',
  isPomodoro: true,
  minutesPomodoro: 1500,
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, start, stop, reset } = useTimer(
    state.isPomodoro ? state.minutesPomodoro : state.minutesBreak
  );

  useEffect(() => {
    if (seconds === 0) {
      if (state.isPomodoro) {
        dispatch({ type: 'TO_START_BREAK' });
        reset(state.minutesBreak);
        start();
      } else {
        dispatch({ type: 'TO_START_POMODORO' });
        reset(state.minutesPomodoro);
        start();
      }
    }
  }, [
    seconds,
    state.isPomodoro,
    state.minutesBreak,
    state.minutesPomodoro,
    reset,
    start,
    dispatch,
  ]);

  function handleStart() {
    if (state.textStart === 'Start Pomodoro') {
      start();

      dispatch({ type: 'TO_START_POMODORO' });
    } else if (state.textStart === 'Start Break') {
      reset();
      start();
      dispatch({ type: 'TO_START_BREAK' });
      state.isPomodoro = false;
    }
  }
  function handleStop() {
    stop();
    if (state.textPause === 'Pause Pomodoro') {
      dispatch({ type: 'PAUSE_POMODORO' });
    } else if (state.textPause === 'Resume Pomodoro') {
      start();
      dispatch({ type: 'TO_START_POMODORO' });
    } else if (state.textPause === 'Pause Break') {
      dispatch({ type: 'PAUSE_BREAK' });
    } else if (state.textPause === 'Resume Break') {
      start();
      dispatch({ type: 'TO_START_BREAK' });
    }
  }

  return (
    <div className="grid col-span-full justify-center ">
      <section className="grid col-span-full justify-center items-center ">
        <h3 className=" text-xl flex ml-5 ">Pomodoro Tracker</h3>
        <Pomodoro
          seconds={seconds}
          isPomodoro={state.isPomodoro}
          start={start}
          stop={stop}
        />
      </section>

      <button
        className="px-[60px] bg-[var(--button-color)] cursor-pointer rounded-xl py-2"
        onClick={handleStart}
      >
        {state.textStart}
      </button>

      <button
        className="mt-2 px-[60px] bg-[var(--button-color)] cursor-pointer rounded-xl py-2 text-[red]"
        onClick={handleStop}
      >
        {state.textPause}
      </button>
    </div>
  );
}
