import React, { useReducer } from 'react';

import useTimer from './useTimer';
import { Pomodoro } from '../components/Pomodoro';


function reducer(state, action) {
  switch (action.type) {
    case 'TO_START_POMODORO':
      return {
        ...state,
        textStart: 'Start Break',
        textPause: 'Pause Pomodoro',
        isPomodoro:true,
        minutesPomodoro:24

      };
    case 'TO_START_BREAK':
      return {
        ...state,
        textStart: 'Start Pomodoro',                     
        textPause: 'Pause Break',
        isPomodoro:false,
        minutesPomodoro:4

      };
    case 'CONCLUDE_BREAK':
      return {
        ...state,
        textStart: 'Resume Break',
        textPause: 'Resume Break',
      };
    case 'CONCLUDE_POMODORO':
      return {
        ...state,
        textStart: 'Resume Pomodoro',
        textPause: 'Resume Pomodoro',
      };
    default:
      return state;
  }
}

const initialState = {
  textStart: 'Start Pomodoro',
  textPause: 'Pause Pomodoro',
  isPomodoro:true,
  minutesPomodoro:24
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { seconds, start, stop ,reset} = useTimer(state.minutesPomodoro);
  
  function handleStart() {
    if(state.textStart === 'Start Pomodoro') {
    start();
    dispatch({ type: 'TO_START_POMODORO' });
    }else if(state.textStart === 'Start Break') {
      reset();
      start();
      dispatch({ type: 'TO_START_BREAK' });
      state.isPomodoro = false
    }
  }
  function handleStop() {
    stop();
    
  }  
  return (
    <>
      <Pomodoro 
       minutes={state.minutesPomodoro}
       seconds={seconds}
       isPomodoro={state.isPomodoro}
       start={start}
       stop={stop}
      /> 
      
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
    </>
  );
}
