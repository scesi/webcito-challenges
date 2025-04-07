import "./style.css";
import { Pomodoro, PomodoroManager, EventDispatcher } from "@core/models";
import { PomodoroConstants } from "@core/constants";

import { PomodoroComponent } from "@ui/components/pomodoro.component.ts";

export const pomodoro = new Pomodoro(
  PomodoroConstants.FOCUS_TIME_DEFAULT,
  PomodoroConstants.BREAK_TIME_DEFAULT,
  PomodoroConstants.LONG_BREAK_TIME_DEFAULT
);

export const eventDispatcher = new EventDispatcher();
export const pomodoroManager = new PomodoroManager(pomodoro, eventDispatcher);

const pomodoroComponent = PomodoroComponent({
  time: pomodoro.focusTime,
});

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  app.appendChild(pomodoroComponent);
}
