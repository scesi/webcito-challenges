import { TimeConstants } from "@constants/index";
import { PomodoroEvent } from "@enums/index";
import { EventDispatcher } from "./event-dispatcher.model";
import { Pomodoro } from "./pomodoro.model";

export class PomodoroManager {
  #interval: NodeJS.Timeout | null = null;
  #pomo: Pomodoro;
  #pomoManager: EventDispatcher;

  constructor(pomo: Pomodoro, eventDispatcher: EventDispatcher) {
    this.#pomo = pomo;
    this.#pomoManager = eventDispatcher;

    this.#initialize();
  }

  #initialize(): void {
    this.#pomoManager.subscribe(PomodoroEvent.START, {
      update: () => {
        this.start();
      },
    });

    this.#pomoManager.subscribe(PomodoroEvent.STOP, {
      update: () => {
        this.stop();
      },
    });

    this.#pomoManager.subscribe(PomodoroEvent.PAUSE, {
      update: () => {
        this.stop();
      },
    });
  }

  public start(): void {
    this.#interval = setInterval(() => {
      this.#pomo.decreaseFocusTime();
      this.#pomoManager.notify({
        eventType: PomodoroEvent.UPDATE_TIME,
        data: {
          time: this.#pomo.currentFocusTime,
        },
      });

      if (this.#pomo.currentFocusTime <= 0) {
        this.stop();
      }
    }, TimeConstants.INTERVAL_TIME);
  }

  public stop(): void {
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = null;
      this.#pomoManager.notify({
        eventType: PomodoroEvent.STOP,
        data: {},
      });
    }
  }

  public resume(): void {
    this.start();
  }
}
