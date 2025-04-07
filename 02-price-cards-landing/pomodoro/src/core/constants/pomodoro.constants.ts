import { TimeConstants } from "./time.constants";

export namespace PomodoroConstants {
  export const FOCUS_TIME_DEFAULT: number =
    25 * TimeConstants.SECONDS_IN_MINUTE;
  export const BREAK_TIME_DEFAULT: number = 5 * TimeConstants.SECONDS_IN_MINUTE;
  export const LONG_BREAK_TIME_DEFAULT: number =
    15 * TimeConstants.SECONDS_IN_MINUTE;
}
