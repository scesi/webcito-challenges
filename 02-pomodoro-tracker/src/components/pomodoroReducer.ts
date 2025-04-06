export interface State {
  timeLeft: number;
  isRunning: boolean;
  isBreak: boolean;
  cycleCount: number;
}

export type Action =
  | { type: "TICK" }
  | { type: "TOGGLE_RUNNING" }
  | { type: "START_POMODORO" }
  | { type: "START_BREAK" };

export const initialState: State = {
  timeLeft: 25 * 60,
  isRunning: false,
  isBreak: true,
  cycleCount: 0,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TICK":
      if (state.timeLeft > 0) {
        const newTime = state.timeLeft - 1;
        if (newTime === 0) {
          if (state.isBreak) {
            return {
              ...state,
              cycleCount: state.cycleCount + 1,
              timeLeft: 25 * 60,
              isBreak: false,
              isRunning: false,
            };
          } else {
            return {
              ...state,
              timeLeft: 5 * 60,
              isBreak: true,
              isRunning: false,
            };
          }
        }
        return { ...state, timeLeft: newTime };
      }
      return state;

    case "TOGGLE_RUNNING":
      return { ...state, isRunning: !state.isRunning };

    case "START_POMODORO":
      return {
        ...state,
        isBreak: false,
        timeLeft: 25 * 60,
        isRunning: true,
      };

    case "START_BREAK":
      return {
        ...state,
        isBreak: true,
        timeLeft: 5 * 60,
        isRunning: true,
      };

    default:
      return state;
  }
}
