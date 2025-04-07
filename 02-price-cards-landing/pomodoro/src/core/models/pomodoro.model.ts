export class Pomodoro {
  #focusTime: number;
  #breakTime: number;
  #longBreakTime: number;
  #currentFocusTime: number;
  #currentBreakTime: number;

  constructor(
    focusTime: number = 0,
    breakTime: number = 0,
    longBreakTime: number = 0
  ) {
    this.#focusTime = focusTime;
    this.#breakTime = breakTime;
    this.#longBreakTime = longBreakTime;
    this.#currentFocusTime = focusTime;
    this.#currentBreakTime = breakTime;
  }

  public get focusTime() {
    return this.#focusTime;
  }

  public get breakTime() {
    return this.#breakTime;
  }

  public get longBreakTime() {
    return this.#longBreakTime;
  }

  public get currentFocusTime() {
    return this.#currentFocusTime;
  }

  public get currentBreakTime() {
    return this.#currentBreakTime;
  }

  public decreaseFocusTime(): void {
    if (this.#currentFocusTime > 0) this.#currentFocusTime--;
  }

  public decreaseBreakTime(): void {
    if (this.#currentBreakTime > 0) this.#currentBreakTime--;
  }

  public resetFocusTime(): void {
    this.#currentFocusTime = this.#focusTime;
  }

  public resetBreakTime(): void {
    this.#currentBreakTime = this.#breakTime;
  }
}
