import { PomodoroEvent } from "../enums";

export interface EventPayload<T> {
  eventType: PomodoroEvent;
  data: T;
}
