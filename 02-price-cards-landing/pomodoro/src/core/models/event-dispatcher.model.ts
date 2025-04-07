import { PomodoroEvent } from "../enums";
import { EventPayload, Observer } from "../interfaces";

export class EventDispatcher {
  private listeners: Map<PomodoroEvent, Observer[]>;

  constructor() {
    this.listeners = new Map<PomodoroEvent, []>();
  }

  public subscribe(event: PomodoroEvent, observer: Observer): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(observer);
  }

  public unsubscribe(event: PomodoroEvent, observer: Observer): void {
    if (this.listeners.has(event)) {
      const observers = this.listeners.get(event);
      if (observers) {
        this.listeners.set(
          event,
          observers.filter((o) => o !== observer)
        );
      }
    }
  }

  public notify(event: EventPayload<unknown>): void {
    if (this.listeners.has(event.eventType)) {
      const observers = this.listeners.get(event.eventType);
      if (observers) {
        observers.forEach((observer) => observer.update(event.data));
      }
    }
  }
}
